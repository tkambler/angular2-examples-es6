'use strict';
/* global ng, moment */

var app = window.app = {};

app.AppComponent = ng.core
    .Component({
        'selector': 'my-app',
        'directives': [
            ng.common.NgFor
        ],
        'template': `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Angular Component</h3>
                </div>
                <div class="panel-body">
                    <p>Days of the Week:</p>
                    <ul>
                        <li *ngFor="#day of week_days">{{day}}</li>
                    </ul>
                </div>
            </div>
        `
    })
    .Class({
        'constructor': function() {

            console.log('AppComponent constructor here.');

            this.week_days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];

        }
    });

document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
});
