'use strict';

var Mn = require('backbone.marionette'),
  Backbone = require('backbone'),
  _ = require('lodash'),
  TodoCollection = require('./models'),
  TaskCollection = require('../task/models'),
  TaskCollectionView = require('../task/views');

var ItemView = Mn.View.extend({

  initialize: function () {
    var _tasks = this.model.get('tasks');

    this._tasks = new TaskCollection(_tasks);
  },

  regions: {
    tasks: '#list-elements'
  },

  ui: {
    taskInput: '#new-task',
    addTask: '#add-task'
    // filter: '.task-filter'
  },

  template: require('./item.html'),

  modelEvents: {
    'change:collapse': 'render'
  },

  events: {
    'click @ui.addTask': '_onNewTask',
    // 'click @ui.filter': '_onFilter',
    keyup: '_onEnter'
  },

  _onNewTask: function (evt) {
    var _newContent = this.ui.taskInput.val();

    if (_.isEmpty(_newContent)) {
      return;
    }
    console.log(this);

    var _newTask = {
        content: _newContent
      },
      _tasks = this.model.get('tasks');

    evt.preventDefault();

    _tasks.push(_newTask);
    this.model.set('tasks', _tasks);
    this.model.save();

    this._tasks.add(_newTask);

    this.ui.taskInput.val('');
  },

  _onEnter: function (evt) {
    var ENTER = 13;

    if (ENTER === evt.which) {
      this._onNewTask(evt);
    }

  },

  // NOT IMPLEMENTED YET
  // _onFilter: function (evt) {
  // },

  onRender: function () {
    this.showChildView('tasks', new TaskCollectionView({
      collection: this._tasks
    }));
  }

});

var CollectionView = Mn.CollectionView.extend({
  childView: ItemView

});

var LayoutView = Mn.View.extend({
  regions: {
    todos: '#todos'
  },

  template: require('./layout.html'),

  _todos: null,

  initialize: function () {
    var that = this;

    this._todos = new TodoCollection();
    this._todos.fetch().done(function (r) {
      if (_.isEmpty(r)) {
        return;
      }

      if (!_.isUndefined(that.options.slug)) {
        var _todo = that._todos.find(function (m) {
          return m.get('slug') === that.options.slug;
        });

        _todo.set('collapse', 'in');
      }
    });
    console.log('layout todo', this);

  },

  onRender: function () {
    this.showChildView('todos', new CollectionView({
      collection: this._todos
    }));
  }

});

module.exports = LayoutView;
