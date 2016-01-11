(function(){
    'use strict';

    angular.module('post', ['ngRoute'])
        .config(defineRoutes)
        .controller('PostController', PostController);

    function defineRoutes($routeProvider) {
        $routeProvider.when('/post', {
            templateUrl: 'app/post/post.html',
            controller: 'PostController'
        });
    }
    function PostController($scope) {

    }
}());
