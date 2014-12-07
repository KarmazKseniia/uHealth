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
              templateUrl: PAGE_URL + 'recipes.html'//,
// Use `resolve` to resolve any asynchronous controller dependencies
              // *before* the controller is instantiated. In this case, since contacts
              // returns a promise, the controller will wait until contacts.all() is
              // resolved before instantiation. Non-promise return values are considered
              // to be resolved immediately.
              /*resolve: {
                recipes: ['recipes',
                  function( recipes){
                    return recipes.all();
                  }]
              },*/

              // You can pair a controller to your template. There *must* be a template to pair with.
             /* controller: ['$scope', '$state', 'recipes', 'utils',
                function (  $scope,   $state,   recipes,   utils) {

                  // Add a 'contacts' field in this abstract parent's scope, so that all
                  // child state views can access it in their scopes. Please note: scope
                  // inheritance is not due to nesting of states, but rather choosing to
                  // nest the templates of those states. It's normal scope inheritance.
                  $scope.recipes = recipes;

                  $scope.goToRandom = function () {
                    var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                    // $state.go() can be used as a high level convenience method
                    // for activating a state programmatically.
                    $state.go('contacts.detail', { contactId: randId });
                  };
                }]*/

            })

            .state('recipes.list', {
              url: '',
              templateUrl: PAGE_URL + 'recipes.list.html'
            });
      }
    ]
  );
