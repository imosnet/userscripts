// ==UserScript==
// @name         I-Term Favicon
// @version      1.0.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/iterm-favicon.user.js
// @match        *://i-term.hq.imos.net/*
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABMUlEQVRYhe3Xu0pDQRSF4c8gGsRCjQiO57TeUJBUFtZqob6FhdhYpImgIClsLGwtbH0Fa9/AB7BLSKc2IhKCWOSIISqCxARhptpz2+ufxQzMpo8tTcLmQB/Fi7jJ9UE4ycJFjA72SDSHdexjFnPvc3/qQJqEkIWHuMZWp2ZXHchOWsQmtrGC4U7RrgEUKqU8GiMXV+vYwxom2pY0f8rxCSBNwiBUa/VmmoR8lmQIoVqr3xUqpWMsYAnzGMcGdn5ziK8cONC6JLt4RBkzWrYu4+Q3Qt+1nj/DCBABIkAEiAARIAJEgAjwLwCaPr7TL239RjbWwGu3AD79iqu1+nlbPN42VYb7o7NhKFRKOeTxjAouMaZVF0xiCtPZ3gc8YbRTr2fVcZoEGVSo1uq3aRJWcfoGG1A2q97Tm40AAAAASUVORK5CYII=
// ==/UserScript==

(function() {
    'use strict';
    document.head.appendChild(Object.assign(document.createElement('link'), {
        rel: 'icon',
        href: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABMUlEQVRYhe3Xu0pDQRSF4c8gGsRCjQiO57TeUJBUFtZqob6FhdhYpImgIClsLGwtbH0Fa9/AB7BLSKc2IhKCWOSIISqCxARhptpz2+ufxQzMpo8tTcLmQB/Fi7jJ9UE4ycJFjA72SDSHdexjFnPvc3/qQJqEkIWHuMZWp2ZXHchOWsQmtrGC4U7RrgEUKqU8GiMXV+vYwxom2pY0f8rxCSBNwiBUa/VmmoR8lmQIoVqr3xUqpWMsYAnzGMcGdn5ziK8cONC6JLt4RBkzWrYu4+Q3Qt+1nj/DCBABIkAEiAARIAJEgAjwLwCaPr7TL239RjbWwGu3AD79iqu1+nlbPN42VYb7o7NhKFRKOeTxjAouMaZVF0xiCtPZ3gc8YbRTr2fVcZoEGVSo1uq3aRJWcfoGG1A2q97Tm40AAAAASUVORK5CYII='
    }));
})();
