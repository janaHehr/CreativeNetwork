(function() {
  'use strict';

  angular.module('tagService', [])
      .factory('tagService', tagService);

  function tagService($q, $http) {
      var result = {};
      result.getTags = function(searchterm) {
          return $http.get('https://api.stackexchange.com/2.2/tags?pagesize=20&order=desc&sort=popular&inname='+ searchterm +'&site=stackoverflow')
              .then(function(body) {
                  return body.data.items;
              });
      };

      return result;
  }
})();
