(function() {
  'use strict';

  angular.module('start', ['createBlogEntry','onEnter'])
    .config(defineRoutes)
    .controller('StartController', StartController);

  function defineRoutes($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/start/start.html',
      controller: 'StartController'
    });
  }

  function StartController($scope, $location) {
    $scope.searchBlogEntry = function() {
      $location.path('/blog');
    };
  }
})();
