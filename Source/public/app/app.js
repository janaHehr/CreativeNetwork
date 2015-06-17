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

      $mdThemingProvider.definePalette('primary', {
          "50": "#edeeee",
          "100": "#cacbca",
          "200": "#a6a9a8",
          "300": "#888c8a",
          "400": "#6b6f6d",
          "500": "#4d5250",
          "600": "#434846",
          "700": "#3a3e3c",
          "800": "#303332",
          "900": "#272928",
          "A100": "#cacbca",
          "A200": "#a6a9a8",
          "A400": "#6b6f6d",
          "A700": "#3a3e3c"
      });
      $mdThemingProvider.definePalette('background', {
          "50": "#ffffff",
          "100": "#ffffff",
          "200": "#ffffff",
          "300": "#ffffff",
          "400": "#ffffff",
          "500": "#ffffff",
          "600": "#dfdfdf",
          "700": "#bfbfbf",
          "800": "#9f9f9f",
          "900": "#808080",
          "A100": "#ffffff",
          "A200": "#ffffff",
          "A400": "#ffffff",
          "A700": "#bfbfbf"
      });
      $mdThemingProvider.definePalette('accent', {
          "50": "#fbf5ed",
          "100": "#f2e1c8",
          "200": "#e9cda3",
          "300": "#e2bc84",
          "400": "#daac65",
          "500": "#d39b46",
          "600": "#b9883d",
          "700": "#9e7435",
          "800": "#84612c",
          "900": "#6a4e23",
          "A100": "#f2e1c8",
          "A200": "#e9cda3",
          "A400": "#daac65",
          "A700": "#9e7435"
      });
      $mdThemingProvider.theme('default')
           .primaryPalette('primary')
           .accentPalette('accent')
           //.backgroundPalette('background')
          //  .dark();
          ;
  }
})();
