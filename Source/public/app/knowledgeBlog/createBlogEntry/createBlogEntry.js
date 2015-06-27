(function() {
  'use strict';

  angular.module('createBlogEntry',['onEnter'])
    .directive('createBlogEntry',createBlogEntry)
    .controller('CreateBlogEntryController',CreateBlogEntryController);

    function createBlogEntry() {
      return {
        restrict:'EA',
        templateUrl:'app/knowledgeBlog/createBlogEntry/createBlogEntry.html',
        controller:'CreateBlogEntryController'
      };
    }

    function CreateBlogEntryController($scope,$location) {
      $scope.model = {
        newEntryTitle:''
      };
      $scope.createBlogEntry = function() {
          $location.path('/blog/new').search('title', $scope.model.newEntryTitle);
      };
    }
})();
