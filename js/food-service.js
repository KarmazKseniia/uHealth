angular.module('uHealth.food.service', [
  ])

  .factory('productFactory',
    [          '$http',
      function ($http) {
        var urlBase = '/api/api/v1/product';
        var factory = {};

        factory.getList = function () {
          return $http.get(urlBase + '/list');
        }

        factory.get = function (id) {
          return $http.get(urlBase + '/' + id);
        };

        factory.insert = function (product) {
          return $http.post(urlBase, product);
        };

        factory.update = function (product) {
          return $http.put(urlBase + '/' + product.id, product)
        };

        factory.delete = function (id) {
          return $http.delete(urlBase + '/' + id);
        };

        return factory;
      }
    ])

  .factory('recipeFactory',
    [          '$http',
      function ($http) {
        var urlBase = '/api/api/v1/recipe';
        var factory = {};

        factory.getList = function () {
          return $http.get(urlBase + '/list');
        }

        factory.get = function (id) {
          return $http.get(urlBase + '/' + id);
        };

        factory.insert = function (recipe) {
          return $http.post(urlBase, recipe);
        };

        factory.update = function (recipe) {
          return $http.put(urlBase + '/' + recipe.id, recipe)
        };

        factory.delete = function (id) {
          return $http.delete(urlBase + '/' + id);
        };

        return factory;
      }
    ]);
