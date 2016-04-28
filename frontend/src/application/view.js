'use strict';

var Radio = require('backbone.radio'),
  Mn = require('backbone.marionette'),
  Regions = require('./regions');


var AppLayout = Mn.View.extend({
  el: '#main',

  template: require('./layout.html'),

  regions: {
    header: {
      selector: '#header-region',
      regionClass: Regions.HeaderRegion,
      replaceElement: true
    },
    content: {
      selector: '#content-region',
      regionClass: Regions.ContentRegion,
      replaceElement: true
    },
    footer: {
      selector: '#footer-region',
      regionClass: Regions.FooterRegion,
      replaceElement: true
    }
  },

  onRender: function () {
    window.App.channels.body.trigger('rendered');
  },

  onBeforeDestroy: function () {
    Radio.reset('layout');
  }

});

module.exports = AppLayout;
