angular.module('CreativeNetwork', [
        'ngRoute',
        'truncate',
        'navigation',
        'knowledgeBlog',
        'ui.codemirror',
        'comparex.syncScroll',
         'ngMaterial'
    ])
    .config(init);

init.$inject = ["$routeProvider", "$locationProvider", "$ShowdownProvider", "$mdThemingProvider"];

function init($routeProvider, $locationProvider, $ShowdownProvider, $mdThemingProvider)
{
    $locationProvider.html5Mode(true);

    $routeProvider.otherwise(
    {
        redirectTo: '/'
    });

    $ShowdownProvider.loadExtension('prismsyntaxhighlighter');

    $mdThemingProvider.theme("default")
        // .primaryPalette("deep-orange")
        // .accentPalette("teal")
        // .backgroundPalette("grey")
        // .dark()
        ;
}
