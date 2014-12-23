angular.module('uHealth.food.service', [
  ])

  .factory('productFactory',
    [          '$http',
      function ($http) {
        var urlBase = API_URL + '/product';
        var factory = {};

        factory.getList = function () {
          return $http.get(urlBase + '/list');
        }

        factory.get = function (id) {
          return $http.get(urlBase + '/' + id);
        };

        factory.insert = function (product) {
          return $http({
            method: 'post',
            url: urlBase,
            data: product,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
        };

        factory.update = function (product) {
          return $http({
            method: 'put',
            url: urlBase + '/' + product.id,
            data: product,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
        };

        factory.delete = function (id) {
          return $http.delete(urlBase + '/' + id);
        };

        factory.getParams = function () {
          return [
            {
              name: 'proteins',
              title: 'Белки',
              value: 0.00
            },
            {
              name: 'fats',
              title: 'Жиры',
              value: 0.00
            },
            {
              name: 'carbohydrates',
              title: 'Углеводы',
              value: 0.0
            },
            {
              name: 'kcal',
              title: 'кКал',
              value: 0.00
            }
          ];
        };

        return factory;
      }
    ])

  .factory('recipeFactory',
    [          '$http',
      function ($http) {
        var urlBase = API_URL + '/recipe';
        var factory = {};

        factory.getList = function () {
          return $http.get(urlBase + '/list');
        }

        factory.get = function (id) {
          return $http.get(urlBase + '/' + id);
        };

        factory.insert = function (recipe) {
          return $http({
            method: 'post',
            url: urlBase,
            data: recipe,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
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
