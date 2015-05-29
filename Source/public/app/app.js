angular.module('CreativeNetwork', [
        'ngRoute',
        'truncate',
        'navigation',
        'knowledgeBlog',
        'ui.codemirror',
        'comparex.syncScroll'
    ])
    .config(init);

init.$inject = ["$routeProvider", "$locationProvider", "$ShowdownProvider"];

function init($routeProvider, $locationProvider, $ShowdownProvider)
{
    $locationProvider.html5Mode(true);

    $routeProvider.otherwise(
    {
        redirectTo: '/'
    });

    $ShowdownProvider.loadExtension('prismsyntaxhighlighter');
}
