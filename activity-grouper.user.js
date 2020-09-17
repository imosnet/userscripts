// ==UserScript==
// @name         Activity grouper
// @match        *://*.redmine.imos.net/*
// @version      1.0
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/activity-grouper.user.js
// @grant        none
// ==/UserScript==

/* global jQuery */

jQuery(function($) {
    'use strict';

    var $options = $('#time_entry_activity_id option'),
        groups = {};
    $options.each(function(){
        var m = $(this).text().match(/^\(([^\)]+)\)/);
        if (!m) return;
        var group = m[1];
        groups[group] = groups[group] || [];
        groups[group].push(this);
    });
    console.log(groups);
    for (let group in groups) {
        let $optgroup = $('<optgroup>', {label: group}).insertBefore(groups[group][0]);
        $(groups[group]).appendTo($optgroup).each(function(){
            this.innerText = this.innerText.replace('('+group+') ', '');
        });
    }
});
