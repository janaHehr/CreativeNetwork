(function() {
    'use strict';

    angular.module('creativeNetwork', [
            'ngRoute',
            'ngSanitize',
            'pascalprecht.translate',
            'btford.socket-io',
            'start',
            'post'
        ])
        .config(init);

    function init($routeProvider, $locationProvider, $translateProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        //i18n: use it with {{'ModulName.Elementname' | translate}}
        $translateProvider.useStaticFilesLoader({
            prefix: 'locales/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.preferredLanguage('de-DE');
        $translateProvider.fallbackLanguage('de-DE');
    }
})();
