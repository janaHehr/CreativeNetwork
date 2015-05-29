(function(){
  'use strict',

angular.module('knowledgeBlog.article', ['Showdown'])
  .directive('knowledgeBlogArticle', knowledgeBlogArticle)
  .controller('KnowledgeBlogArticleController', KnowledgeBlogArticleController);

KnowledgeBlogArticleController.$inject = ['$scope','knowledgeBlogService'];

function knowledgeBlogArticle() {
  return {
    restrict: 'AE',
    templateUrl: 'app/knowledgeBlog/knowledgeBlogArticle/knowledgeBlogArticle.html',
    scope: {
      article: '='
    },
    controller: 'KnowledgeBlogArticleController'
  };
}

function KnowledgeBlogArticleController($scope, knowledgeBlogService){

  $scope.Save = function(){
    knowledgeBlogService.updateBlogEntry($scope.article);
    $scope.model.isEditMode=!$scope.model.isEditMode
  }

  $scope.Delete = function(){
    knowledgeBlogService.deleteBlogEntry($scope.article._id);
    $scope.model.isEditMode=!$scope.model.isEditMode
  }

  $scope.model={
    isEditMode: false,
    editorOptions : {
      lineWrapping : true,
      lineNumbers: true,
      autoCloseBrackets: true,
    //  theme: "monokai",
    //  readOnly: 'nocursor',
      mode: 'markdown',
    }
  }
}
})();
