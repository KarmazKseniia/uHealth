angular.module('uHealth.sport.service', [
  ])

  // A RESTful factory
  .factory('sport',
  [          '$http',
    function ($http) {
      var path = 'api/exercises.php'; //'assets/exercises.json';
      var exercises = $http.get(path).then(function (resp) {
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
