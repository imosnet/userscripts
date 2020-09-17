// ==UserScript==
// @name         Dirty PM
// @match        http://pm.hq.imos.net/power-tracking/
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @version      1.0.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/dirty-pm.user.js
// @grant        none
// ==/UserScript==

/* global jQuery */

jQuery.noConflict(true)(function($) {
    'use strict';

    $('input:text,select').each(function(){
        var $this = $(this),
            cleanValue = this.value;
        $this.on('change', function(){
            $this.toggleClass('dirty', this.value != cleanValue);
        });
    });
    $('form').on('submit', function(e){
        var $rows = $(this).find('.dirty').closest('tr').has('input[type=checkbox][id$=_submit]:not(:checked)');
        if ($rows.length === 0) return;
        if (!window.confirm('Dirty values not saved! Continue?')) {
            $rows.css({transition:'all 400ms ease', background: 'red'});
            setTimeout(function(){ $rows.css({background:''}); }, 400);
            setTimeout(function(){ $rows.css({background:'red'}); }, 800);
            setTimeout(function(){ $rows.css({background:''}); }, 1200);

            e.preventDefault();
            return false;
        }
    });
});
