(function() {
  'use strict';

  angular.module('knowledgeBlog', ['knowledgeBlog.article', 'cutString', 'knowledgeBlogService', 'createBlogEntry'])
    .config(defineRoutes)
    .controller('KnowledgeBlogController', KnowledgeBlogController);

  function defineRoutes($routeProvider) {
    $routeProvider.when('/blog', {
      templateUrl: 'app/knowledgeBlog/knowledgeBlog.html',
      controller: 'KnowledgeBlogController'
    });
  }

  function KnowledgeBlogController($scope, knowledgeBlogService, $location, $filter, $routeParams) {
    $scope.entries = [];
    $scope.selectedEntry = {};
    $scope.model = {
      search:''
    };
    console.log($routeParams.search);
    if ($routeParams.search) {
      $scope.model.search = $routeParams.search;
    }
    $scope.openEntry = function(entry) {

      if (entry && entry._id) {
        var path = '/blog/' + entry._id;
        $location.path(path);
      }
    };

    $scope.createBlogEntry = function() {
      $location.path('/blog/new');
    };

    knowledgeBlogService.getEntries().then(function(entries) {
      $scope.entries = entries;
    });

    $scope.getContent = function(content) {
      return $filter('cutString')(content, true, 400, '...');
    };
  }
})();
