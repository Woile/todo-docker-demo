'use strict';

var Backbone = require('backbone'),
  Router = require('../routes/router'),
  Radio = require('backbone.radio'),
  Marionette = require('backbone.marionette'),
  ApplicationView = require('./view');

module.exports = Marionette.Application.extend({
  router: null,

  initialize: function () {
    this.router = new Router();
    this.on('start', this._onStart);
  },

  channels: {
    body: Radio.channel('body'),
    route: Radio.channel('route'),
    content: Radio.channel('content'),
    element: Radio.channel('element')
  },

  _onStart: function () {
    var appView = new ApplicationView({});

    appView.render();

    Backbone.history.start({});
  }

});
