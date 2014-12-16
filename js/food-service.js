angular.module('uHealth.food.service', [
  ])

  // A RESTful factory
  .factory('products',
    [          '$http',
      function ($http) {
        var products = $http.get('/api/api/v1/product/list').then(function (resp) {
          if (resp.data.error) {
            log_error(resp.data.error);
            return null;
          }
          return resp.data;
        });

        var factory = {};
        factory.all = function () {
          return products;
        };

        return factory;
      }
    ]);
