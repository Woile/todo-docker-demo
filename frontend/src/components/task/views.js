'use strict';

var Mn = require('backbone.marionette');

var ItemView = Mn.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('./item.html'),

  ui: {
    check: '#btn-check',
    delete: '#btn-delete'
  },

  events: {
    'click @ui.check': '_onChecked',
    'click @ui.delete': '_onDelete'
  },

  _onChecked: function () {
    this.model.set('is_done', !this.model.get('is_done'));
    this.render();
  },

  _onDelete: function () {
    this.destroy();
  }

});

var CollectionView = Mn.CollectionView.extend({
  childView: ItemView,
  tagName: 'ul',
  className: 'list-group list-group-flush'

});

module.exports = CollectionView;
