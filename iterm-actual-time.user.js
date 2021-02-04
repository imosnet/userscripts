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
// @require      https://gist.githubusercontent.com/Fluidbyte/4718380/raw/874e29e5ac43b4973e8f4eb1c572d65094bcbc1b/SimpleStore.js
// ==/UserScript==

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
