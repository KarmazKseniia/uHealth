angular.module('uHealth.food', [
    'ui.router'
  ])
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
          $stateProvider

            .state('recipes', {
              url: '/recipes',
              abstract: true,
              templateUrl: PAGE_URL + 'recipes.html'
            })

            .state('recipes.list', {
              url: '',
              templateUrl: PAGE_URL + 'recipes.list.html'
            });
      }
    ]
  );
