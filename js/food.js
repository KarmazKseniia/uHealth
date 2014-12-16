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
          })

          .state('recipes.add', {
            url: '/add',
            templateUrl: PAGE_URL + 'recipes.add.html',
            resolve: {
              products: ['productFactory',
                function (productFactory) {
                  return productFactory.getList();
                }]
            },
            controller: function ($scope, products) {
              $scope.products = products.data.products;

              $scope.selectProduct = function () {
                angular.extend(this.$parent.ingredient, this.p);
                this.showProductList = false;
              }
            }
          });
      }
    ]
  )
  .controller('addRecipeController', function ($scope, recipeFactory) {
    var INITIAL_INGREDIENTS_COUNT = 5;

    $scope.ingredients = [];
    for (var i = 0; i < INITIAL_INGREDIENTS_COUNT; i++) {
      $scope.ingredients.push({});
    }

    $scope.addIngredient = function () {
      $scope.ingredients.push({});
    }

    $scope.saveRecipe = function () {
      var data = angular.extend($scope.recipe, {
        ingredients: $scope.ingredients.filter(function($v) { return !!$v.id; })
      });

      recipeFactory.insert(data)
        .success(function(data) {
          console.log(data);
        })
        .error(function(error) {
          console.log(error);
        })
    }
  });

