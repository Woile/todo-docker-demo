/* globals App */
'use strict';

var Radio = require('backbone.radio'),
  Mn = require('backbone.marionette'),
  BaseRouter = require('backbone.base-router'),
  TodoRouter = require('../components/todo/route');

module.exports = BaseRouter.extend({

  onNavigate: function (routeData) {
    var routeObj = routeData.linked;

    routeObj.show(routeData);
    console.log('shown', routeObj.type, routeData);
    App.channels.route.trigger('shown', routeObj.type, routeData);
  },

  routes: function () {
    var r = {
      '': new TodoRouter(),
      ':todoItemId(/)': new TodoRouter()
    };

    return r;
  }
});

// module.exports = function (App) {
//   var urlHandler, router;

//   /**
//    * Controller of the Router.
//    * @type {Object}
//    */
//   urlHandler = {
//     home: function () {
//       // Write home here.
//     }
//   };

//   /**
//    * appRoutes contains:
//    *      (url):(function inside urlHandler)
//    * To make a dynamic url, for example to redirect
//    * to an id, the url should be like: '/:id'
//    */
//   App.Router = Mn.AppRouter.extend({
//     appRoutes: {
//       '/': 'home'
//     }
//   });

//   router = new App.Router({
//     controller: urlHandler
//   });

//   Radio.channel('root').on('create:layout', function () {

//     var layout = require('./components/layout')();

//     App.main.show(layout.view, {forceShow: true});

//   });

//   // Create layout
//   Radio.channel('root').trigger('create:layout');

//   return {
//     router: router,
//     urlHandler: urlHandler
//   };

// };
