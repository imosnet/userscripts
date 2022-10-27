// ==UserScript==
// @name        PM always to late
// @icon        *://pm.hq.imos.net/favicon.ico
// @version     1.0.0
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/pm-always-to-late.user.js
// @match       *://pm.hq.imos.net/power-tracking/*
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @grant       none
// @author      Samuel Kengeter
// ==/UserScript==

jQuery.noConflict(true)(function($) {
    let $timeCellSelector = $('table.power-tracking tr.group-0-ticket').next().find('td:nth-child(2)');
    let timeCellContent = $timeCellSelector.text();
    let timeCellContentParts = timeCellContent.replace(/\s+/g,'').slice(0, -1).split('(');
    let timeDifference = Number(timeCellContentParts[0]) - Number(timeCellContentParts[1]);
    $timeCellSelector.append(`[${timeDifference}]`);
});
