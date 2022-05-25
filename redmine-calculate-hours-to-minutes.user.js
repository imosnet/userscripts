// ==UserScript==
// @name        Redmine calculate Hours to Minutes
// @icon        https://kunden.redmine.imos.net/favicon.ico
// @version     1.0.1
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-calculate-hours-to-minutes.user.js
// @match       *://kunden.redmine.imos.net/*
// @match       *://intern.redmine.imos.net/*
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @grant       none
// ==/UserScript==

jQuery.noConflict(true)(function($) {
    if($('.estimated-hours .value').length) {
        let hours = $('.estimated-hours .value').html();
        hours = hours.replace(' (Gesamtzahl: ', '')
        hours = hours.replace(')', '')
        hours = parseFloat(hours.replace(' h', ''))

        $('.estimated-hours .value').append('<span> = ' + Math.round(hours * 3600 / 60) + ' min</span>');
    }
    if($('.spent-time .value a').length) {
        let hours = $('.spent-time .value a').html();
        hours = parseFloat(hours.replace(' h', ''))

        $('.spent-time .value a').append('<span> = ' + Math.round(hours * 3600 / 60) + ' min</span>');
    }
});
