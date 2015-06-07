(function () {
  'use strict';
  angular.module('creativeNetwork', [
          'ngRoute',
          'truncate',
          'navigation',
          'start',
          'knowledgeBlog',
          'ui.codemirror',
          'comparex.syncScroll',
           'ngMaterial',
           'ng-mfb'
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

      $mdThemingProvider.theme('default')
          .primaryPalette('brown')
          .accentPalette('orange')
          .backgroundPalette('brown')
          //  .dark()
          ;
  }
})();
