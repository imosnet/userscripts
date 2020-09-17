// ==UserScript==
// @name         WC-Title
// @version      1.0.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/wc-title.user.js
// @match        *://*.imosnet.de/*
// @icon         https://www.imos.net/images/default/layout/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var [wc,project] = location.host.replace(/^.*?([a-z]+\.[a-z]+)\.imosnet\.de$/, '$1').split('.');
    if (wc.length) {
        document.title = wc.toUpperCase() + ' | ' + document.title.replace('(NICHT IM LIVEMODUS)', '').replace(/^[ -]+/, '');
    }
})();
