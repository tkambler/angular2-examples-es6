'use strict';
/* global ng */

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
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        `
    })
    .Class({
        'constructor': function() {
            console.log('AppComponent constructor here.');
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
});
