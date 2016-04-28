'use strict';

var cfg = require('../config');

var API_URL = cfg.api_domain + cfg.api_prefix;

var todosUrl = [API_URL, 'todos'].join('');


module.exports = {
  todos: todosUrl
};
