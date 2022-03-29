// ==UserScript==
// @name         ITerm Actual Time
// @namespace    http://tampermonkey.net/
// @version      1.0
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/iterm-actual-time.user.js
// @description  Zeigt die aktuelle Arbeitszeit an und benachrichtigt den Benutzer, wenn er 8 Stunden gearbeitet hat
// @author       Samuel Kengeter
// @match        https://i-term.hq.imos.net/*
// @grant        none
// @icon         https://web.archive.org/web/20191226232211if_/https://krutec.de/wp-content/uploads/2018/04/cropped-krutec-favicon-1-32x32.png
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require      https://raw.githubusercontent.com/Nickersoft/push.js/master/bin/push.min.js
// ==/UserScript==

/**
 * Simple localStorage with Cookie Fallback
 * v.1.0.0
 *
 * USAGE:
 * ----------------------------------------
 * Set New / Modify:
 *   store('my_key', 'some_value');
 *
 * Retrieve:
 *   store('my_key');
 *
 * Delete / Remove:
 *   store('my_key', null);
 */
 
var store = function store(key, value) {
 
    var lsSupport = false;
    
    // Check for native support
    if (localStorage) {
        lsSupport = true;
    }
    
    // If value is detected, set new or modify store
    if (typeof value !== "undefined" && value !== null) {
        // Convert object values to JSON
        if ( typeof value === 'object' ) {
            value = JSON.stringify(value);
        }
        // Set the store
        if (lsSupport) { // Native support
            localStorage.setItem(key, value);
        } else { // Use Cookie
            createCookie(key, value, 30);
        }
    }
    
    // No value supplied, return value
    if (typeof value === "undefined") {
        // Get value
        if (lsSupport) { // Native support
            data = localStorage.getItem(key);
        } else { // Use cookie 
            data = readCookie(key);
        }
        
        // Try to parse JSON...
        try {
           data = JSON.parse(data);
        }
        catch(e) {
           data = data;
        }
        
        return data;
        
    }
    
    // Null specified, remove store
    if (value === null) {
        if (lsSupport) { // Native support
            localStorage.removeItem(key);
        } else { // Use cookie
            createCookie(key, '', -1);
        }
    }
    
    /**
     * Creates new cookie or removes cookie with negative expiration
     * @param  key       The key or identifier for the store
     * @param  value     Contents of the store
     * @param  exp       Expiration - creation defaults to 30 days
     */
    
    function createCookie(key, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = key + "=" + value + expires + "; path=/";
    }
    
    /**
     * Returns contents of cookie
     * @param  key       The key or identifier for the store
     */
    
    function readCookie(key) {
        var nameEQ = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0, max = ca.length; i < max; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
};

(function() {
    //'use strict';

    //load css
    $('body').append(
        '<style type="text/css">' +
        'table.custom-table {' +
        '    width: 80%;' +
        '    margin: 0 auto;' +
        '    border-top: solid 1px #a3c0e8;' +
        '    border-right: solid 1px #a3c0e8;' +
        '}' +
        '.custom-table td {' +
        '    text-align: right;' +
        '    border-bottom: solid 1px #a3c0e8;' +
        '    border-left: solid 1px #a3c0e8;' +
        '    padding: 5px;' +
        '}' +
        '</style>');

    function calculateTime() {
        var timeAsText, timeParts, minutes, i = 0, startTime, endTime, totalTime = 0;

        var totalTimes = (+$('#ctl00_ContentPlaceHolder1_grdBuchungen_DXMainTable tr > td:first-child').length) - 1;
        //console.log(totalTimes);

        $('#ctl00_ContentPlaceHolder1_grdBuchungen_DXMainTable tr > td:first-child').each(function(){
            if(i != 0) //erste zeile auslassen
            {
                //console.log(i);
                //console.log($(this).text());
                timeAsText = $(this).text();
                timeParts = timeAsText.split(':');

                minutes = (+timeParts[0]) * 60 + (+timeParts[1]);

                //console.log(minutes);
                if(i % 2 == 0) { //gerade
                    //console.log('gerade');
                    endTime = minutes;
                    //console.log(endTime - startTime);
                    totalTime += endTime - startTime;
                }
                else { //ungerade
                    //console.log('ungerade');
                    //console.log(i);
                    startTime = minutes;

                    if (i == totalTimes) {
                        var now = new Date();
                        endTime = (+now.getHours()) * 60 + (+now.getMinutes());
                        //console.log(endTime - startTime);
                        totalTime += endTime - startTime;
                    }
                }
            }
            i++;
        });



        console.log('Total: ' + totalTime);

        var totalTimeH = Math.floor(totalTime / 60);
        var totalTimeM = totalTime - totalTimeH * 60;

        var restTime = 480 - totalTime;
        console.log('Rest ' + restTime);

        var restTimeH = Math.floor(restTime / 60);
        var restTimeM = restTime - restTimeH * 60;

        var feierAbend = endTime + restTime;
        var feierAbendH = Math.floor(feierAbend / 60);
        var feierAbendM = feierAbend - feierAbendH * 60;



        if(totalTime > 480) {
            let today = new Date().toISOString().slice(0, 10);
            $('#ctl00_ContentPlaceHolder1_GridView3_DXMainTable div').html(
                '<table class="custom-table">' +
                '<tr>' +
                '    <td></td>' +
                '    <td>min</td>' +
                '    <td>hh:mm</td>' +
                '</tr>' +
                '<tr>' +
                '    <td>Total:</td>' +
                '    <td>' + totalTime + '</td>' +
                '    <td>' + totalTimeH.toString().padStart(2, '0') + ':' + totalTimeM.toString().padStart(2, '0') + '</td>' +
                '</tr>' +
                '</table>');

            if(store('date') != today) {
                store('date', today);
                Push.create('Feierabend')
            }
        } else {
            $('#ctl00_ContentPlaceHolder1_GridView3_DXMainTable div').html(
                '<table class="custom-table">' +
                '<tr>' +
                '    <td></td>' +
                '    <td>min</td>' +
                '    <td>hh:mm</td>' +
                '</tr>' +
                '<tr>' +
                '    <td>Total:</td>' +
                '    <td>' + totalTime + '</td>' +
                '    <td>' + totalTimeH.toString().padStart(2, '0') + ':' + totalTimeM.toString().padStart(2, '0') + '</td>' +
                '</tr>' +
                '<tr>' +
                '    <td>To Go:</td>' +
                '    <td>' + restTime + '</td>' +
                '    <td>' + restTimeH.toString().padStart(2, '0') + ':' + restTimeM.toString().padStart(2, '0') + '</td>' +
                '</tr>' +
                '<tr>' +
                '    <td>Feierabend:</td>' +
                '    <td></td>' +
                '    <td>' + feierAbendH.toString().padStart(2, '0') + ':' + feierAbendM.toString().padStart(2, '0') + '</td>' +
                '</tr>' +
                '</table>');
        }
    }

    //funktion initial aufrufen:
    calculateTime();

    //jede minute aktualsieren
    (function() {
        setInterval(calculateTime, 60000);
    })();
})();
