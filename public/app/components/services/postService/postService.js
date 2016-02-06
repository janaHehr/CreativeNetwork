(function() {
    'use strict';

    angular.module('postService', ['socketService'])
        .factory('postService', postService);

    function postService($q, socketService) {
        var module = {};

        module.postCreatedOrUpdated = function() {};
        socketService.on('postCreatedOrUpdated', function(post) {
            module.postCreatedOrUpdated(post);
        });

        module.getPostList = function() {

            var deferred = $q.defer();
            socketService.emit('getPostList', function(posts) {
                deferred.resolve(posts);
            });

            return deferred.promise;
        };

        module.createOrUpdatePost = function(post) {
            var deferred = $q.defer();
            socketService.emit('createOrUpdatePost', post, function(post) {
                deferred.resolve(post);
            });
            return deferred.promise;
        };

        module.commitPost = function(post) {
            var deferred = $q.defer();
            socketService.emit('commitPost', post, function() {
                deferred.resolve();
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
