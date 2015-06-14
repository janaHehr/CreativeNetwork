(function() {
    'use strict';

    angular.module('knowledgeBlogService', [])
        .factory('knowledgeBlogService', knowledgeBlogService);

    function knowledgeBlogService($q, $http) {
        var result = {};
        result.getEntries = function() {
            return $http.get('/api/blog')
                .then(function(body) {
                    return body.data;
                });
        };

        result.createBlogEntry = function(entry) {
            return $http.post('/api/blog', entry);
        };

        result.updateBlogEntry = function(entry) {
            return $http.put('/api/blog/' + entry._id, entry);
        };

        result.deleteBlogEntry = function(id) {
            return $http.delete('/api/blog/' + id);
        };

        result.getBlogEntry = function(id) {
            return $http.get('/api/blog/' + id)
                .then(function(body) {
                    return body.data;
                });
        };

        return result;
    }

}());
