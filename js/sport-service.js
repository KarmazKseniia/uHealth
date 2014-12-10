angular.module('uHealth.sport.service', [
  ])

  // A RESTful factory
  .factory('sport',
  [          '$http',
    function ($http) {
      var exercises = $http.get('/api/api/v1/exercise').then(function (resp) {
        return resp.data.exercises;
      });

      var factory = {};
      factory.all = function () {
        return exercises;
      };
     /* factory.get = function (id) {
        return sport.then(function(){
          return utils.findById(exercises, id);
        })
      };*/
      return factory;
    }
  ]);
