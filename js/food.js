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
				products: ['products',
				  function(products){
					return products.all();
				  }]
			  },
			  controller: ['$scope', '$state', 'products',
				function (  $scope,   $state,   products) {
				  $scope.products = products;
				  
				  var INITIAL_INGREDIENTS_COUNT = 5;
  	
					$scope.ingredients = [];
					for (var i = 0; i < INITIAL_INGREDIENTS_COUNT; i++) {
						$scope.ingredients.push({});
					}
					
					$scope.addIngredient = function() {
						$scope.ingredients.push({});
					}
					
					$scope.selectProduct = function() {
						angular.extend(this.$parent.ingredient, this.p);
						this.showProductList = false;
					}
				}]
            });
      }
    ]
  );

