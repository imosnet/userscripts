// ==UserScript==
// @name        Redmine Check for Commits
// @description Prüft vor dem Submit, ob es Commits gibt. Falls ja, wird eine Warnung ausgegeben
// @author      imos.net
// @icon        https://kunden.redmine.imos.net/favicon.ico
// @version     1.0.1
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-check-for-commits.user.js
// @include     https://kunden.redmine.imos.net/*
// @include     http://kunden.redmine.imos.net/*
// @include     https://intern.redmine.imos.net/*
// @include     http://intern.redmine.imos.net/*
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @grant       none
// ==/UserScript==

jQuery.noConflict(true)(function($) {

    $('#issue-form').submit(function(e){
        let m;

        // nur zum debuggen aktivieren
        // e.preventDefault()

        // wir prüfen erst einmal, ob Zielversion auf (Current ist). Falls, ja, brauchen wir nichts weiter zu tun
        const zielVersion = $('#issue_fixed_version_id option:selected').text()
        console.log(zielVersion)

        const regexZielVersion = /(\(current\))/gmi; //case-insensitive suche

        let matchesZielversion = false;

        while ((m = regexZielVersion.exec(zielVersion)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regexZielVersion.lastIndex) {
                regexZielVersion.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                matchesZielversion = true
            });
        }

        if(matchesZielversion === true) {
            console.log('Zielversion ist auf current')
            $(this).unbind('submit').submit()
        }

        // nun prüfen wir, ob mit diesem Ticket bereits Commits verknüpft wurden
        let matchesCommits = false
        if($('#issue-changesets').length) {
            matchesCommits = true;
        }

        // nun prüfen wir, ob im Kommentartext eine Commitmessage hinterlegt wurde
        const Comment = $('#issue_notes').val();
        // matched auf r12345 oder auf commit:c7b5ccf0
        const regexComment = /(r[0-9]{3,5})|(commit:[a-z0-9]*)+/gm;

        let matchesComment = false
        while ((m = regexComment.exec(Comment)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regexComment.lastIndex) {
                regexComment.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                matchesComment = true
            });
        }

        // falls Zielversion nicht auf (current) aber bereits Commits mit dem Ticket verknüpft sind oder
        // falls Zielversion nicht auf (current) aber ein Match im Kommentartext vorhanden ist, zeige Warnung an
        if(matchesZielversion === false && matchesCommits === true || matchesZielversion === false && matchesComment === true) {
            let confirmAction = confirm('Es sind Commits vorhanden! Du kannst auf [Abbrechen] klicken und nochmal die Zielversion prüfen')
            if(confirmAction) {
                //formular abschicken
                $(this).unbind('submit').submit()
            } else {
                //formular nicht abschicken
                e.preventDefault()
            }
        }
    })
});
