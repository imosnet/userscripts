// ==UserScript==
// @name         party parrot - PARTY OR DIE
// @namespace    https://github.com/jmhobbs/cultofthepartyparrot.com
// @version      0.3.2
// @description  There's no parrot like party parrot!
// @author       cuidas
// @match        http://*/*
// @match        https://*/*
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/tampermonkey.partyparrot.user.js
// @grant        none
// ==/UserScript==

(function(k,o,n,a,m,i){addEventListener('keydown',function(e){e.which!=k[o]?o=0:++o==k.length&&n()})})([38,38,40,40,37,39,37,39,66,65],0,function(){
    // Starting the party, and there is no party without parrots!!
    var parrots = [];

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/repos/jmhobbs/cultofthepartyparrot.com/contents/parrots/hd');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) return;
        for (var item of JSON.parse(xhr.responseText)) {
            if (item.type != 'file') continue;
            parrots.push(item.download_url);
        }
        createParrot();
        setInterval(createParrot, 1000);
    };
    xhr.send(null);

    // Appends a new parrot to the body and animates it
    // parrot chosen by random
    function createParrot() {
        var img = document.createElement('img');
        img.src = parrots[Math.floor(Math.random() * parrots.length)];
        img.style.position = 'fixed';
        img.style.zIndex = '9001';
        img.style.transition = 'all 1s ease';
        animateIMG(img);
        document.body.appendChild(img);
        setTimeout(animateIMG.bind(null, img), 1);
        setInterval(animateIMG.bind(null, img), 800);
    }

    // Animation of the parrot (position and size)
    function animateIMG(img) {
        img.style.top = Math.floor(Math.random() * 100) + '%';
        img.style.left = Math.floor(Math.random() * 100) + '%';
        img.style.transform = 'scale(' + (Math.random() + 0.3) + ')';
    }
});
