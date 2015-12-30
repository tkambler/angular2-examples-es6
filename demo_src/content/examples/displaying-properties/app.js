'use strict';
/* global ng, moment */

var app = window.app = {};

app.AppComponent = ng.core
    .Component({
        'selector': 'my-app',
        'template': `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Angular Component</h3>
                </div>
                <div class="panel-body">
                    <p>Today's date is: {{date}}</p>
                </div>
            </div>
        `
    })
    .Class({
        'constructor': function() {
            console.log('AppComponent constructor here.');
            this.date = moment().format('MMMM Do YYYY');
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
});
