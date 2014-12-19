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
            templateUrl: PAGE_URL + 'recipes.list.html',
            resolve: {
              recipes: ['recipeFactory',
                function (recipeFactory) {
                  return recipeFactory.getList();
                }]
            },
            controller: function ($scope, recipes) {
              $scope.recipes = recipes.data.recipes;
            }
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
                this.$parent.showProductList = false;
                // TODO: select amount field
              };
            }
          })

          .state('products', {
            url: '/products',
            abstract: true,
            templateUrl: PAGE_URL + 'products.html'
          })

          .state('products.list', {
            url: '',
            templateUrl: PAGE_URL + 'products.list.html',
            resolve: {
              products: ['productFactory',
                function (productFactory) {
                  return productFactory.getList();
                }]
            },
            controller: function ($scope, products, productFactory) {
              $scope.products = products.data.products;
              $scope.productParams = productFactory.getParams();

              $scope.editProduct = function () {
                this.product.editMode = true;
              };

              $scope.saveEditProduct = function () {
                var product = this.product;

                productFactory.update(product)
                  .success(function (data) {
                    product.editMode = false;
                    console.log(data);
                  })
                  .error(function (error) {
                    console.log(error);
                  });
              };
            }
          })

          .state('products.add', {
            url: '/add',
            templateUrl: PAGE_URL + 'products.add.html',
            resolve: {
              products: ['productFactory',
                function (productFactory) {
                  return productFactory.getList();
                }]
            },
            controller: function ($scope, products) {
              $scope.products = products.data.products;
            }
          });
      }
    ]
  )
  .controller('addProductController', function ($scope, productFactory) {
    $scope.productParams = productFactory.getParams();
    $scope.saveProduct = function () {
      var data = $scope.product;
      for (var i = 0; i < $scope.productParams.length; i++) {
        data[$scope.productParams[i].name] = $scope.productParams[i].value;
      }

      productFactory.insert(data)
        .success(function (data) {
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        });
    };
  })
  .controller('addRecipeController', function ($scope, recipeFactory) {
    // ui settings //
    var editor = CKEDITOR.replace('editorSteps', { // CKEDITOR.instances.editorSteps
      language: 'ru',
      uiColor: '#f0f0f0'
    });

    var INITIAL_INGREDIENTS_COUNT = 5;
    $scope.recipe = {};

    $scope.ingredients = [];
    for (var i = 0; i < INITIAL_INGREDIENTS_COUNT; i++) {
      $scope.ingredients.push({});
    }

    $scope.addIngredient = function () {
      $scope.ingredients.push({});
    };

    $scope.removeIngredient = function () {
      $scope.ingredients.splice(this.$index, 1);
    };

    $scope.saveRecipe = function () {
      var data = angular.extend($scope.recipe, {
        ingredients: $scope.ingredients.filter(function ($v) {
          return !!$v.id;
        })
      });

      $scope.recipe.steps = editor.getData();

      recipeFactory.insert(data)
        .success(function (data) {
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        });
    };
  });

