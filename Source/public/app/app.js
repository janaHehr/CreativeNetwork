angular.module('creativeNetwork', [
        'ngRoute',
        'truncate',
        'navigation',
        'knowledgeBlog',
        'ui.codemirror',
        'comparex.syncScroll',
         'ngMaterial'
    ])
    .config(init);

function init($routeProvider, $locationProvider, $showdownProvider, $mdThemingProvider)
{
    $locationProvider.html5Mode(true);

    $routeProvider.otherwise(
    {
        redirectTo: '/'
    });

    $showdownProvider.loadExtension('prismsyntaxhighlighter');

    $mdThemingProvider.theme("default")
        .primaryPalette("brown")
        .accentPalette("orange")
        .backgroundPalette("brown")
        //  .dark()
        ;
}
