'use strict';

var Backbone = require('backbone'),
  urls = require('../../urls');

/**
 * Used to save any required global state for the app.
 */
var Model = Backbone.Model.extend({
  defaults: {
    collapse: '',
    title: '',
    slug: ''
  },

  parse: function (r) {
    var id = r.hid;

    r.id = id;
    delete r.hid;

    return r;
  },

  toJSON: function () {
    var _obj = Backbone.Model.prototype.toJSON.call(this);

    delete _obj.collapse;
    delete _obj._id;
    delete _obj.id;

    return _obj;
  }

});

var Collection = Backbone.Collection.extend({
  url: urls.todos,
  model: Model
});


module.exports = Collection;
