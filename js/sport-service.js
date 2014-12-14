angular.module('uHealth.sport.service', [
  ])

  // A RESTful factory
  .factory('sport',
  [          '$http',
    function ($http) {
      var exercises = $http.get('/api/api/v1/exercise/list').then(function (resp) {
		if (resp.data.error) {
			log_error(resp.data.error);
			return null;
		}
        return resp.data;
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
