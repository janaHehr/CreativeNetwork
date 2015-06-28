(function() {
  'use strict';

  angular.module('start', ['createBlogEntry', 'onEnter'])
    .config(defineRoutes)
    .controller('StartController', StartController);

  function defineRoutes($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/start/start.html',
      controller: 'StartController'
    });
  }

  function StartController($scope, $location) {
    $scope.model = {
      search: ''
    };

    $scope.searchBlogEntry = function() {
      if ($scope.model.search) {
        $location.path('/blog').search('search', $scope.model.search);
      }
      else {
        $location.path('/blog');
      }
    };
  }
})();
