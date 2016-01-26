(function() {
    'use strict';

    angular.module('postService', ['socketService'])
        .factory('postService', postService);

    function postService($q, socketService) {
        var module = {};

        module.getPostList = function() {

            var deferred = $q.defer();
            socketService.emit('getPostList', function(posts) {
                deferred.resolve(posts);
            });

            return deferred.promise;
        };

        module.addPost = function(post) {
            var deferred = $q.defer();
            socketService.emit('addPost', post, function(post) {
                deferred.resolve(post);
            });
            return deferred.promise;
        };

        module.getPost = function(name) {
            var deferred = $q.defer();
            socketService.emit('getPost', name, function(post) {
                deferred.resolve(post);
            });
            return deferred.promise;
        };

        return module;
    }
}());
