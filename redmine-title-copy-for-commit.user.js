// ==UserScript==
// @name        Redmine Title Copy for Commit
// @icon        https://kunden.redmine.imos.net/favicon.ico
// @version     1.0
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-title-copy-for-commit.user.js
// @include     https://kunden.redmine.imos.net/*
// @include     https://intern.redmine.imos.net/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant       none
// ==/UserScript==

jQuery.noConflict(true)(function($) {
    if (!$('body.controller-issues.action-show').length) return;
    var mainTitle = $('body.controller-issues.action-show h2:first').text();
    var subTitle  = $('body.controller-issues.action-show div.subject h3:first').text();
    $('#update form div.box').append('<fieldset><legend>Redmine Title Copy for Commit</legend><pre>' + mainTitle + ' - ' + subTitle + '</pre></fieldset>');
});
