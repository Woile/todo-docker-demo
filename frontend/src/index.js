'use strict';

var Backbone = require('backbone');

Backbone.$ = require('jquery');
require('backbone.marionette');
require('./shims/radio.shim.js');


var App = require('./application/application'),
  app = new App({});

window.App = app;
app.start();

window.Backbone = Backbone;
window.jQuery = require('jquery');
window.Tether = require('tether');
require('bootstrap');
