(function()
{
    'use strict',

    angular.module('knowledgeBlog', ['knowledgeBlog.article'])
        .config(defineRoutes)
        .factory("knowledgeBlogService", knowledgeBlogService)
        .controller("KnowledgeBlogController", KnowledgeBlogController);

    defineRoutes.$inject = ["$routeProvider"];
    knowledgeBlogService.$inject = ["$q", "$http"];
    KnowledgeBlogController.$inject = ["$scope", "knowledgeBlogService"];

    function defineRoutes($routeProvider)
    {
        $routeProvider.when('/blog',
        {
            templateUrl: 'app/knowledgeBlog/knowledgeBlog.html',
            controller: 'KnowledgeBlogController'
        });
    }

    function knowledgeBlogService($q, $http)
    {
        var result = {};
        result.getEntries = function()
        {
            var deferred = $q.defer();

            return $http.get('/api/blog')
                .then(function(body, status, headers, config)
                {
                    return body.data;
                });
        };

        result.createBlogEntry = function()
        {
            return $http.post('/api/blog');
        }

        result.updateBlogEntry = function(entry)
        {
            return $http.put('/api/blog/' + entry._id, entry);
        }

        result.deleteBlogEntry = function(id)
        {
            return $http.delete('/api/blog/' + id);
        }

        return result;
    }

    function KnowledgeBlogController($scope, knowledgeBlogService)
    {
        $scope.entries = [];
        $scope.selectedEntry = {};
        $scope.IsEdit = false;

        $scope.setCurrentEntry = function(entry)
        {
            $scope.selectedEntry = entry;
            $scope.IsEdit = true;
        }

        $scope.createBlogEntry = function()
        {
            knowledgeBlogService.createBlogEntry().then(function(result)
            {
                $scope.setCurrentEntry(result.data);
            });
        }

        knowledgeBlogService.getEntries().then(function(entries)
        {
            $scope.entries = entries;
        });
    }
})();
