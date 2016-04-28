/* globals App*/
'use strict';

var Mn = require('backbone.marionette');

module.exports = Mn.Object.extend({
  ViewClass: null,

  ModelClass: null,

  show: function (routeData) {
    var route = routeData.linked;
    var opts = this.getOpts(routeData.params);

    console.log('Shown', route.type, opts, arguments);
    App.channels.content.trigger('region:showView', this.ViewClass, opts);
  },

  /**
   * Override this.
   */
  getOpts: function () {
    return {};
  }

});
