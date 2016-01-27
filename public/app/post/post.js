(function() {
    'use strict';

    angular.module('post', ['ngRoute', 'postService'])
        .config(defineRoutes)
        .controller('PostController', PostController);

    function defineRoutes($routeProvider) {
        $routeProvider.when('/post/:name', {
            templateUrl: 'app/post/post.html',
            controller: 'PostController'
        });
    }

    function PostController($scope, $routeParams, postService) {
        postService.postCreatedOrUpdated = function(post) {
            if (post.name === $scope.post.name) {
                $scope.post = post;
            }
        };

        postService.getPost($routeParams.name).then(function(post) {
            $scope.post = post;
        });

        $scope.createOrUpdatePost = function() {
            postService.createOrUpdatePost($scope.post);
        };
    }
}());
