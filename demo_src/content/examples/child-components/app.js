'use strict';
/* global ng */

var app = window.app = {};

var Well = ng.core
    .Component({
        'selector': 'well',
        'template': `
            <div class="well">This is a well.</div>
        `
    })
    .Class({
        'constructor': function() {
            console.log('Well constructor here.');
        }
    });

var AppComponent = ng.core
    .Component({
        'selector': 'my-app',
        'directives': [Well],
        'template': `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Angular Component</h3>
                </div>
                <div class="panel-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <well>This is a well.</well>
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
    ng.platform.browser.bootstrap(AppComponent);
});
