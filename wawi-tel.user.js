// ==UserScript==
// @name         Wawi tel:
// @version      1.0.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/wawi-tel.user.js
// @match        https://wawi.hq.imos.net/*
// @grant        none
// ==/UserScript==

/* global jQuery */

jQuery(function($) {
    $('a[href^="cticlient:"]').each(function(){
        this.href = this.href.replace(/cticlient:\s*\/dial \s*/, 'tel:');
    });
});
