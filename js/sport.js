angular.module('uHealth.sport', [
    'ui.router'
  ])
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $stateProvider

          .state('sport', {
            url: '/sport',
            abstract: true,
            templateUrl: PAGE_URL + 'sport.html',
            resolve: {
              exercises: ['sport',
                function (exercises) {
                  return exercises.all();
                }]
            },
            controller: ['$scope', '$state', 'exercises',
              function ($scope, $state, exercises) {
                $scope.exercises = exercises;
//            $state.go('contacts.detail', { contactId: randId });
              }]
          })

          .state('sport.list', {
            url: '',
            templateUrl: PAGE_URL + 'sport.list.html'
          });
      }
    ]
  );


