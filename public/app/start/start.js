(function() {
    'use strict';

    angular.module('start', ['ngRoute', 'postService'])
        .config(defineRoutes)
        .controller('StartController', StartController);

    function defineRoutes($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/start/start.html',
            controller: 'StartController'
        });
    }

    function StartController($scope, $location, postService) {
        postService.getPostList().then(function(posts) {
            $scope.posts = posts;
        });

        $scope.newPost = {};

        $scope.createPost = function() {
            if (typeof $scope.newPost.name !== 'undefined' && typeof $scope.newPost.text !== 'undefined' && $scope.newPost.name.length > 0) {
                postService.createPost($scope.newPost).then(function(post) {
                    $location.path('/post/' + post.name);
                });
            }
        };
    }
}());
