(function(){
  'use strict',

  angular.module('knowledgeBlog', ['knowledgeBlog.article','CreativeNetwork.knowledgeBlogService'])
      .config(defineRoutes)
      .controller("KnowledgeBlogController", KnowledgeBlogController);

  defineRoutes.$inject = ["$routeProvider"];
  KnowledgeBlogController.$inject = ["$scope", "knowledgeBlogService"];

  function defineRoutes($routeProvider)
  {
      $routeProvider.when('/blog',
      {
          templateUrl: 'app/knowledgeBlog/knowledgeBlog.html',
          controller: 'KnowledgeBlogController'
      });
  }

  function KnowledgeBlogController($scope, knowledgeBlogService)
  {
      $scope.entries = [];
      $scope.selectedEntry = {};
      $scope.IsEdit = false;

      $scope.setCurrentEntry = function(entry) {
        $scope.selectedEntry = entry;
        $scope.IsEdit = true;
      }

      $scope.createBlogEntry = function() {
        knowledgeBlogService.createBlogEntry().then(function(result){
          $scope.setCurrentEntry(result.data);
        });
      }

      knowledgeBlogService.getEntries().then(function(entries)
      {
          $scope.entries = entries;
      });
  }
})();
