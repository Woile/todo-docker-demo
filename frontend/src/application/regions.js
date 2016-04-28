'use strict';

var Mn = require('backbone.marionette'),
  HeaderView = require('../header/view'),
  FooterView = require('../footer/view');

var ContentRegion = Mn.Region.extend({
  initialize: function () {
    this.listenTo(window.App.channels.content, 'region:showView', this._showView);
  },

  _showView: function (View, viewOptions) {
    this.show(new View(viewOptions));
  }

});

var HeaderRegion = Mn.Region.extend({
  initialize: function () {
    this.listenTo(window.App.channels.body, 'rendered', this._onBodyRendered);
  },

  _onBodyRendered: function () {
    this.show(new HeaderView());
  }

});

var FooterRegion = Mn.Region.extend({
  initialize: function () {
    this.listenTo(window.App.channels.body, 'rendered', this._onBodyRendered);
  },

  _onBodyRendered: function () {
    this.show(new FooterView());
  }

});

module.exports = {
  ContentRegion: ContentRegion,
  HeaderRegion: HeaderRegion,
  FooterRegion: FooterRegion
};
