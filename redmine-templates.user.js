// ==UserScript==
// @name        Redmine Templates
// @icon        https://kunden.redmine.imos.net/favicon.ico
// @version     1.0
// @downloadURL https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-templates.user.js
// @include     http*://kunden.redmine.imos.net/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant       none
// ==/UserScript==


jQuery.noConflict(true)(function($) {

    $('.jstElements').append('<span class="jstSpacer">&nbsp;</span>');

    $.getJSON('https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-templates.json', function(json){
        //console.log(json.templates);
        $.each(json.templates, function(key, value) {
            //console.log(key + ' ' + value);

            $('.jstElements').append('<button type="button" tabindex="200" class="" title="" id="template-' + key + '" style="font-size: 10px; vertical-align: bottom;">' + key + '</button>');

            $('fieldset #template-' + key).on("click", function(){

                let $txt = $("textarea#issue_notes"),
                    caretPos = $txt[0].selectionStart,
                    textAreaTxt = $txt.val();
                $txt.val(textAreaTxt.substring(0, caretPos) + value + textAreaTxt.substring(caretPos) );
            })

        })
    });

});
