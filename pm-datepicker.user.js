// ==UserScript==
// @name         PM Datepicker
// @version      1.0
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/pm-datepicker.user.js
// @include      http://pm.hq.imos.net/*
// @require      https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @icon         http://pm.hq.imos.net/favicon.ico
// @grant        none
// ==/UserScript==

jQuery(function($){
    $('input.date').datepicker({
        dateFormat: 'dd.mm.yy',
        showButtonPanel: true,
        firstDay: 1
    });

    var today = formatDate('dd.MM.yyyy', new Date);
    $('.action-stats_missed_times tbody td:first-child')
        .filter(el => el.innerText.startsWith(today))
        .addClass('today');
});


function formatDate(format, date) {
    return format.replace(/y+|M+|d+|H+|h+|m+|s+/g, function(match){
        var ret = date[{
            y: 'getYear',
            M: 'getMonth',
            d: 'getDate',
            H: 'getHours',
            h: 'getHours',
            m: 'getMinute',
            s: 'getSecond'
        }[match[0]]]();

        if (match === 'yyyy') ret = date.getFullYear();
        if (match[0] === 'M') ret = ret + 1;
        if (match[0] === 'h') ret = (ret - 1) % 12 + 1;

        return ret.toString().padStart(match.length, 0);
    });
}
