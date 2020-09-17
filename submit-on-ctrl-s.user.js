// ==UserScript==
// @name         Submit on Ctrl+S
// @description  Submits forms on Ctrl+S instead of trying to save as HTML
// @version      0.3.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/submit-on-ctrl-s.user.js
// @author       okj579
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('keydown', function(e){
        if (!(e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey && e.key.toLowerCase() === 's')) return;
        e.preventDefault();

        for(var elem = e.target; elem; elem = elem.parentElement) {
            if (elem.tagName === 'FORM') return elem.submit();
        }
    });
})();
