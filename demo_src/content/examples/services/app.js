'use strict';
/* global ng, chance */

var app = window.app = {};

class People {

    constructor() {
        console.log('People constructor');
        this.names = [];
        this.generateNames();
    }

    generateNames() {
        this.names.splice(0, this.names.length);
        for ( var i = 0; i < 3; i++ ) {
            this.names.push(chance.name());
        }
    }

    get data() {
        return this.names;
    }

}

app.AppComponent = ng.core
    .Component({
        'selector': 'my-app',
        'viewProviders': [People],
        'directives': [
            ng.common.NgFor
        ],
        'template': `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Angular Component</h3>
                </div>
                <div class="panel-body">
                    <p>People:</p>
                    <ul>
                        <li *ngFor="#person of people">{{person}}</li>
                    </ul>
                </div>
            </div>
        `
    })
    .Class({
        'constructor': [People, function(people) {
            console.log('AppComponent constructor here.');
            console.log('people.data', people.data);
            this.people = people.data;
        }]
    });

document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
});
