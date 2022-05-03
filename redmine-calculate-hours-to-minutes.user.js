// ==UserScript==
// @name        Redmine calculate Hours to Minutes
// @icon        https://kunden.redmine.imos.net/favicon.ico
// @version     1.0.0
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-calculate-hours-to-minutes.user.js
// @match       *://kunden.redmine.imos.net/*
// @match       *://intern.redmine.imos.net/*
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @grant       none
// ==/UserScript==

jQuery.noConflict(true)(function($) {
    if($('.estimated-hours .value').length) {
        $('.estimated-hours .value').append('<span> = ' + Math.round($('.estimated-hours .value').html().replace(' h', '') * 3600 / 60) + ' min</span>');
    }
    if($('.spent-time .value a').length) {
        $('.spent-time .value a').append('<span> = ' + Math.round($('.spent-time .value a').html().replace(' h', '') * 3600 / 60) + ' min</span>');
    }
});
