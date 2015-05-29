(function(){
'use strict';
angular.module('CreativeNetwork.knowledgeBlogService',[])
  .factory("knowledgeBlogService", knowledgeBlogService)

  knowledgeBlogService.$inject = ["$q", "$http"];

  function knowledgeBlogService($q, $http)
  {
    var result ={};
    result.getEntries = function()
    {
        var deferred = $q.defer();

        return $http.get('/api/blog')
          .then(function(body, status, headers, config){
            return body.data;
          });
    };

    result.createBlogEntry = function(){
      return $http.post('/api/blog');
    }

    result.updateBlogEntry = function(entry){
      return $http.put('/api/blog/'+entry._id, entry);
    }

    result.deleteBlogEntry = function(id){
      return $http.delete('/api/blog/'+ id);
    }    

    return result;
  }
})();
