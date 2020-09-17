// ==UserScript==
// @name         Fake Optgroups
// @version      1.0.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/fake-optgroups.user.js
// @match        *://*/de/admin/*
// @icon         https://www.imos.net/images/default/layout/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll('option[style]').forEach(function(option){
        var level = (parseInt(option.style.paddingLeft) - 2) / 18;
        option.innerHTML = '&nbsp;'.repeat(level * 2 - 1) + (level ? '└ ' : '') + option.innerHTML.trim();
    });
})();
