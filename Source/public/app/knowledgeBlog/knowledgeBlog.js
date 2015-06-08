(function () {
    'use strict';

    angular.module('knowledgeBlog', ['knowledgeBlog.article'])
        .config(defineRoutes)
        .factory('knowledgeBlogService', knowledgeBlogService)
        .controller('KnowledgeBlogController', KnowledgeBlogController);

    function defineRoutes($routeProvider) {
        $routeProvider.when('/blog', {
            templateUrl: 'app/knowledgeBlog/knowledgeBlog.html',
            controller: 'KnowledgeBlogController'
        });
    }

    function knowledgeBlogService($q, $http) {
        var result = {};
        result.getEntries = function () {
            return $http.get('/api/blog')
                .then(function (body) {
                    return body.data;
                });
        };

        result.createBlogEntry = function (entry) {
            return $http.post('/api/blog',entry);
        };

        result.updateBlogEntry = function (entry) {
            return $http.put('/api/blog/' + entry._id, entry);
        };

        result.deleteBlogEntry = function (id) {
            return $http.delete('/api/blog/' + id);
        };

        result.getBlogEntry = function (id) {
          return $http.get('/api/blog/' + id)
          .then(function (body) {
              return body.data;
          });
        };

        return result;
    }

    function KnowledgeBlogController ($scope, knowledgeBlogService, $location) {
        $scope.entries = [];
        $scope.selectedEntry = {};

        $scope.openEntry = function(entry)
        {
            var path = '/blog/' + entry._id;
            $location.path(path);
        };

        $scope.createBlogEntry = function()
        {
          $location.path('/blog/new');
        };

        knowledgeBlogService.getEntries().then(function(entries)
        {
            $scope.entries = entries;
        });
    }
})();
