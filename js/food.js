angular.module('uHealth.food', [
    'ui.router'
  ])
  .filter('unsafe', function ($sce) {
    return $sce.trustAsHtml;
  })
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $stateProvider

          .state('recipes', {
            url: '/recipes',
            abstract: true,
            templateUrl: PAGE_URL + 'recipes.html',
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
            templateUrl: PAGE_URL + 'recipes.add.html'
          })

          .state('recipes.edit', {
            url: '/edit/:id',
            templateUrl: PAGE_URL + 'recipes.edit.html'
          })

          .state('recipes.details', {
            url: '/:id',
            templateUrl: PAGE_URL + 'recipes.details.html',
            resolve: {
              recipe: ['recipeFactory', '$stateParams',
                function (recipeFactory, $stateParams) {
                  return recipeFactory.get($stateParams.id);
                }]
            },
            controller: function ($scope, recipe, $sce) {
              $scope.recipe = recipe.data.recipe && recipe.data.recipe[0];

              $scope.renderHtml = function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
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
    $scope.saveRecipe = function () {
      var data = angular.extend($scope.recipe, {
        ingredients: $scope.ingredients.filter(function ($v) {
          return !!$v.id;
        })
      });

      $scope.recipe.steps = CKEDITOR.instances.editorSteps.getData();

      recipeFactory.insert(data)
        .success(function (data) {
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        });
    };
  })

  .controller('recipeItemController', function ($scope) {
    var INITIAL_INGREDIENTS_COUNT = 3;
    $scope.$parent.recipe = {};

    $scope.$parent.ingredients = [];
    for (var i = 0; i < INITIAL_INGREDIENTS_COUNT; i++) {
      $scope.$parent.ingredients.push({});
    }

    $scope.addIngredient = function () {
      $scope.$parent.ingredients.push({});
    };

    $scope.removeIngredient = function () {
      $scope.$parent.ingredients.splice(this.$index, 1);
    };

    $('[data-toggle="tooltip"]').tooltip({container: 'body'});
  })

  .controller('CKEditorController', function ($scope, recipeFactory) {
    // ui settings //
    CKEDITOR.replace('editorSteps', { // CKEDITOR.instances.editorSteps
      language: 'ru',
      uiColor: '#f0f0f0',
      filebrowserUploadUrl: 'resources/ckupload.php'
    });
  });


