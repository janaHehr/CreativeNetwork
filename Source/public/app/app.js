(function () {
  'use strict';
  angular.module('creativeNetwork', [
          'ngRoute',
          'truncate',
          'error',
          'navigation',
          'start',
          'knowledgeBlog',
          'ui.codemirror',
          'comparex.syncScroll',
         'ngMaterial',
         'ng-mfb',
         'pascalprecht.translate',
         'errorHandling'
      ])
      .config(init);


  function init($routeProvider, $locationProvider, $showdownProvider, $mdThemingProvider, $translateProvider, $httpProvider)
  {
     //i18n
     $translateProvider.useStaticFilesLoader({
          prefix:'locales/',
          suffix: '.json'
      });
      $translateProvider.preferredLanguage('en-US');
      $translateProvider.fallbackLanguage('en-US');

      $httpProvider.interceptors.push('httpInterceptor');

      $locationProvider.html5Mode(true);

      $routeProvider.otherwise(
      {
          redirectTo: '/error/404'
      });

      $showdownProvider.loadExtension('prismsyntaxhighlighter');

      $mdThemingProvider.definePalette('primary', {
          '50': '#edeeee',
          '100': '#cacbca',
          '200': '#a6a9a8',
          '300': '#888c8a',
          '400': '#6b6f6d',
          '500': '#4d5250',
          '600': '#434846',
          '700': '#3a3e3c',
          '800': '#303332',
          '900': '#272928',
          'A100': '#cacbca',
          'A200': '#a6a9a8',
          'A400': '#6b6f6d',
          'A700': '#3a3e3c'
      });
      $mdThemingProvider.definePalette('accent', {
          '50': '#fbf5ed',
          '100': '#f2e1c8',
          '200': '#e9cda3',
          '300': '#e2bc84',
          '400': '#daac65',
          '500': '#d39b46',
          '600': '#b9883d',
          '700': '#9e7435',
          '800': '#84612c',
          '900': '#6a4e23',
          'A100': '#f2e1c8',
          'A200': '#e9cda3',
          'A400': '#daac65',
          'A700': '#9e7435'
      });
      $mdThemingProvider.theme('default')
           .primaryPalette('primary')
           .accentPalette('accent')
          //  .dark();
          ;
  }
})();
