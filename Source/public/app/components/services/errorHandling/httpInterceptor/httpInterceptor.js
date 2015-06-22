(function() {
  'use strict';

  angular.module('httpInterceptor', [])
    .factory('httpInterceptor', httpInterceptor);

    function httpInterceptor($q, $location) {
      return {
        responseError: function(response) {
          if (response.status = 404) {
            $location.path('/error/404');
          }

          return $q.reject(response);
        }
    };
  }
})();
