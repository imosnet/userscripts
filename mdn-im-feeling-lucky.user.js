// ==UserScript==
// @name         MDN I'm feeling lucky
// @author       okj579
// @description  Redirects you from the search page to the first result if it matches your query exactly (or with '..' instead of '.prototype.')
// @version      2.0.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/mdn-im-feeling-lucky.user.js
// @match        https://developer.mozilla.org/*/search?*
// @icon         https://www.google.com/s2/favicons?domain=developer.mozilla.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (history.state && history.state.redirected) return;

    var input = document.querySelector('.search-input-field'),
        result = document.querySelector('a.result-title');

    if (input.value.replace('..', '.prototype.').toLowerCase() === result.innerText.replace(/\(\)$/, '').toLowerCase()) {
        history.replaceState({redirected:true}, document.title, window.location);
        window.open(result.href, '_self', null, false);
    }
})();
