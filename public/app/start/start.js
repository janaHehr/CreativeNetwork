(function(){
    'use strict';

    angular.module('start', ['ngRoute'])
        .config(defineRoutes)
        .controller('StartController', StartController);

    function defineRoutes($routeProvider) {
        $routeProvider.when('/start', {
            templateUrl: 'app/start/start.html',
            controller: 'StartController'
        });
    }
    function StartController($scope) {

    }
}());
