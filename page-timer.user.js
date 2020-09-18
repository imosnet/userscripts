// ==UserScript==
// @name        imos Page Timer
// @namespace   tag://imos
// @description Ein Timer der anzeigt wie lange man sich auf der aktuellen Redmine/OTRS Seite befindet.
// @author      Endlessdeath, okj579
// @match       *://kunden.redmine.imos.net/*
// @match       *://intern.redmine.imos.net/*
// @match       *://otrs.hq.imos.net/*
// @version     2.2
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/imos-page-timer.user.js
// @icon        https://kunden.redmine.imos.net/favicon.ico
// @require     https://raw.github.com/odyniec/jQuery-tinyTimer/master/jquery.tinytimer.min.js
// @grant       none
// ==/UserScript==

/* global jQuery */

jQuery(function($){
    if (location.host.match(/redmine/)) {
        $('#top-menu').append('<div style="float: right; margin-right: 0.5em; font-weight: bold; color: yellow;">Time on Page: <span class="page-timer"></span></div>');
        $('#time_entry_hours').parent('p').append('<div style="display: inline; margin-left: 0.5em; font-weight: bold; color: #505050;">(Time on Page: <span class="page-timer"></span>)</div>');

        var title = $('#content h2:first').text() + ' - ' + $('#content h3:first').text();
        $('<input onclick="this.select()">').css({width:20}).val(title)
            .wrap('<div class="contextual">').parent().prependTo('#content');
    } else if (location.host.match(/otrs/)) {
        $('#Header').append('<div style="float: right; margin-right: 30em; font-weight: bold; color: red;">Time on Page: <span class="page-timer"></span></div>')
    }

    $('.page-timer').tinyTimer({
        from: Date.now(),
    });
});
