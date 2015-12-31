'use strict';
/* global ng */

var FormComponent = ng.core
    .Component({
        'selector': 'my-form',
        'directives': [
            ng.common.NgFor
        ],
        'template': `
            <div>

                <form (ngSubmit)="onSubmit()" #heroForm="ngForm">

                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" required [(ngModel)]="model.name" ngControl="name">
                    </div>

                    <div class="form-group">
                        <label for="alterEgo">Alter Ego</label>
                        <input type="text" class="form-control" required [(ngModel)]="model.alter_ego" ngControl="alter_ego">
                    </div>

                    <div class="form-group">
                        <label for="power">Hero Power</label>
                        <select class="form-control" required [(ngModel)]="model.power" ngControl="power">
                            <option *ngFor="#p of powers" [value]="p">{{p}}</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-default">Submit</button>

                </form>

                <br><br>

                <pre><code>{{data}}</code></pre>

            </div>
        `
    })
    .Class({
        'constructor': function() {

            console.log('FormComponent constructor.', this);

            this.powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
            this.model = {};

        },
        'onSubmit': function() {
            console.log('onSubmit', this);
            this.data = JSON.stringify(this.model, null, 4);
        }
    });

var AppComponent = ng.core
    .Component({
        'selector': 'my-app',
        'directives': [FormComponent],
        'template': `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Angular Component</h3>
                </div>
                <div class="panel-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <my-form></my-form>
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
