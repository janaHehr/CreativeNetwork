angular.module('knowledgeBlog', [])
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

        $http.get('/api/blogEntries').
        success(function(data, status, headers, config)
        {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config)
        {
            deferred.reject();
        });

        return deferred.promise;
    };

    return result;
}

function KnowledgeBlogController($scope, knowledgeBlogService)
{
    $scope.entries = [];

    knowledgeBlogService.getEntries().then(function(entries)
    {
        $scope.entries = entries;

    }, function()
    {
        // TODO: Error handling
    });
}
