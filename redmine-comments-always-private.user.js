// ==UserScript==
// @name        Redmine comments always private
// @icon        https://kunden.redmine.imos.net/favicon.ico
// @version     1.0
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-comments-always-private.user.js
// @include     http*://kunden.redmine.imos.net/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant       none
// ==/UserScript==

jQuery.noConflict(true)(function($) {
    $('#issue_private_notes').prop('checked', true);
});
