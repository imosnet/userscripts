// ==UserScript==
// @name       Redmine Spent Time Hider
// @namespace  tag:/imos
// @version    1.1
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-spent-time-hider.js
// @include    *://kunden.redmine.imos.net/issues/*
// @description  Blendet die "Aufgewendete Zeit" bei Kundentickets aus oder ein.
// @grant   GM_addStyle
// @run-at document-start
// ==/UserScript==

(function(){
    'use strict';

    GM_addStyle(".spent-time { display:none; }");

    (function factory(fn){setTimeout(()=>(unsafeWindow.$||factory)(fn), 1)})(function($){
        $('<input id="toggleTime" type="button" style="" value="hide/show" />')
            .wrap('<div id="timeButton" class="contextual">')
            .on('click', () => $(".spent-time").toggle())
            .prependTo('#content');
    });
})();
