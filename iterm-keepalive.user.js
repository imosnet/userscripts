// ==UserScript==
// @name         ITerm Keepalive
// @version      2.1.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/iterm-keepalive.user.js
// @match        https://i-term.hq.imos.net/*
// @grant        none
// @icon         https://web.archive.org/web/20191226232211if_/https://krutec.de/wp-content/uploads/2018/04/cropped-krutec-favicon-1-32x32.png
// ==/UserScript==

(function() {
    'use strict';
    // Auf Login-Formular ausschalten
    if (document.querySelector('form[action="Login.aspx"]')) return;

    setInterval(function(){
        fetch('https://i-term.hq.imos.net/Info.aspx').then(response => {
            if (response.ok) return;
            // Wir wurden ausgeloggt, Login-Seite laden
            window.location = 'https://i-term.hq.imos.net/';
        });
    }, 60*1000);
})();
