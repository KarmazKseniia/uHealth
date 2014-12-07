var PAGE_URL = '/html/pages/';
var routes = [
  {
    path: '/sport',
    title: 'Спорт',
    templateUrl: PAGE_URL + 'sport.html',
    requireLogin: false
  }
];

angular.module('uhealth', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', '$httpProvider'], function ($routeProvider, $locationProvider, $httpProvider) {
    //this loads up our routes dynamically from the previous object
    for (var i = 0; i < routes.length; i++) {
      $routeProvider.when(routes[i].path, routes[i]);
    }
    $routeProvider.otherwise({ redirectTo: '/' });
//    $locationProvider.html5Mode(true);


/*$httpProvider.interceptors.push(function ($q) {
      return {
        'request': function (config) {
          config.url += (config.url.indexOf('template/html/') != -1) ? api.config.get_version() : '';
          return config;
        }
      };
    });*//*

  }]);
*/

  });