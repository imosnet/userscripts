// ==UserScript==
// @name         Imos Redmine Wiedervorlage überfällig
// @match        *://kunden.redmine.imos.net/*
// @match        *://intern.redmine.imos.net/*
// @icon         https://kunden.redmine.imos.net/favicon.ico
// @version      2.1.2
// @downloadURL  https://raw.githubusercontent.com/imosnet/userscripts/master/redmine-overdue.user.js
// @grant        none
// ==/UserScript==
//(function w(n,f){for(var p,i=0;i<n.length;i++)if(this[n[i]])p.push(this[n[i]]);else return setTimeout(w.bind(this,arguments),1);f.apply(this,p);})
(function w(n,f){n.every(x=>this[x])?f.apply(this,n.map(x=>this[x])):setTimeout(x=>w(n,f),1)})
(['jQuery'], function($) {
    var $form = $('form.edit_issue'),
        dueDateSelector = 'input#issue_due_date',
        $dueDate = $form.find(dueDateSelector),
        $submit = $form.find('input[name=commit]'),
        today;

    $form.on('input.overdue change.overdue', dueDateSelector, function(){
        var val = this.value,
            color = val < today ? 'red' : val == today ? 'darkorange' : '';
        $(this).add(this.labels).css({color: color});
    })

    $submit.on('click', function(){
        var value = $dueDate.val();
        if (value && value < today) {
            return confirm("Willst du wirklich das Wiedervorlagedatum in der Vergangenheit lassen?");
        }
    });

    if ($('#all_attributes').length) {
        function update(){
            today = (new Date).toJSON().slice(0,10);
            $dueDate = $form.find(dueDateSelector);
            $dueDate.trigger('change.overdue');
        }

        // Wenn Formular aktualisiert wird
        new MutationObserver(update).observe($('#all_attributes')[0], {childList: true});

        (function updateDate() {
            var now = new Date,
                tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
            setTimeout(updateDate, tomorrow.getTime() - now.getTime());
            update();
        })();
    }
});
