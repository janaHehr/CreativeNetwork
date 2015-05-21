angular.module('CreativeNetwork', [
        'ngRoute',
        'truncate',
        'navigation',
        'knowledgeBlog'
    ])
    .config(init);

init.$inject = ["$routeProvider", "$locationProvider"];

function init($routeProvider, $locationProvider)
{
    $locationProvider.html5Mode(true);

    $routeProvider.otherwise(
    {
        redirectTo: '/'
    });
}
