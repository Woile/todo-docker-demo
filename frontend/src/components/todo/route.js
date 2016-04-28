'use strict';

var Route = require('../../routes/routes'),
  _ = require('lodash'),
  Model = require('./models'),
  View = require('./views');


module.exports = Route.extend({
  ViewClass: View,

  getOpts: function (params) {
    var opts = this._getTodoOpts(params);

    return opts;
  },

  _getTodoOpts: function (params) {
    var opts = null;

    if (!_.isUndefined(params.todoItemId)) {
      opts = {
        slug: params.todoItemId
      };
    }

    return opts;
  }


});
