// ==UserScript==
// @name         Redmine - Interne Notizen
// @icon         https://kunden.redmine.imos.net/favicon.ico
// @version      1.0.1
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-interne-notizen.user.js
// @include      https://kunden.redmine.imos.net/*
// @include      https://intern.redmine.imos.net/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

jQuery.noConflict(true)(function($) {
    'use strict';
    var $privateNotes = $('div.journal.private-notes');
    if (!$privateNotes.length) return;

    $privateNotes.each(function(){
        var $this = $(this),
            $note = $this.children();
        $this.prepend(`
            <div>
              <a class="show-private-note" style="margin: 10px 0; padding: 10px 0; background-color: #FFAAAA; cursor: pointer; display: block; width: 100%; vertical-align: middle; text-align: center; color: black;">Interne Notiz anzeigen</a>
              <a class="hide-private-note" style="margin: 10px 0; padding: 10px 0; background-color: #AAAA93; cursor: pointer; display: block; width: 100%; vertical-align: middle; text-align: center; color: black;">Interne Notiz ausblenden</a>
            </div>
        `);

        var $hideButton = $this.find('a.hide-private-note'),
            $showButton = $this.find('a.show-private-note');

        $showButton.on('click', function() {
            $note.show();
            $showButton.hide();
            $hideButton.show();
        });
        $hideButton.on('click', function() {
            $note.hide();
            $hideButton.hide();
            $showButton.show();
        });

        $hideButton.hide();
        $note.hide();
    })
})();
