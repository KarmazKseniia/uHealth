var PAGE_URL = 'html/pages/';
var routes = [
  {
    url: '/',
    state: 'landing',
    title: 'uHealth - все что нужно для здорового образа жизни',
    templateUrl: PAGE_URL + 'landing.html',
    requireLogin: false
  },
  {
    url: '/beauty',
    state: 'beauty',
    title: 'Красота',
    templateUrl: PAGE_URL + 'beauty.html',
    requireLogin: false
  },
  {
    url: '/health',
    state: 'health',
    title: 'Здоровье',
    templateUrl: PAGE_URL + 'health.html',
    requireLogin: false
  },
  {
    url: '/personal',
    state: 'personal',
    title: 'Мой кабинет',
    templateUrl: PAGE_URL + 'personal.html',
    requireLogin: false
  }
];

angular.module('uHealth', [
    'ui.router',
    'uHealth.food',
    'uHealth.sport.service',
    'uHealth.sport',
    'uHealth.beauty',
    'uHealth.health',
    'uHealth.personal'
  ])

  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )

  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
        $urlRouterProvider
          //.when('/c?id', '/contacts/:id')
          .otherwise('/');

        for (var i = 0; i < routes.length; i++) {
          $stateProvider.state(routes[i].state, routes[i]);
        }

      }
    ]
  );


  /*.config(['$routeProvider', '$locationProvider', '$httpProvider'], function ($routeProvider, $locationProvider, $httpProvider) {
    //this loads up our routes dynamically from the previous object
    for (var i = 0; i < routes.length; i++) {
      $routeProvider.when(routes[i].path, routes[i]);
    }
    $routeProvider.otherwise({ redirectTo: '/' });
//    $locationProvider.html5Mode(true);


*//*$httpProvider.interceptors.push(function ($q) {
      return {
        'request': function (config) {
          config.url += (config.url.indexOf('template/html/') != -1) ? api.config.get_version() : '';
          return config;
        }
      };
    });*//**//*

  }]);
*//*

  });*/