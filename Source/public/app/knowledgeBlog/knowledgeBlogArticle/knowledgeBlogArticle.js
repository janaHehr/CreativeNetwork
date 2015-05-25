angular.module('knowledgeBlog.article', ['Showdown'])
  .directive('knowledgeBlogArticle', knowledgeBlogArticle)
  .controller('KnowledgeBlogArticleController', KnowledgeBlogArticleController);

KnowledgeBlogArticleController.$inject = ["$scope"];

function knowledgeBlogArticle() {
  return {
    restrict: 'AE',
    templateUrl: 'app/knowledgeBlog/knowledgeBlogArticle/knowledgeBlogArticle.tpl.html',
    scope: {
      article: '='
    },
    controller: 'KnowledgeBlogArticleController'
  };
}

function KnowledgeBlogArticleController($scope){
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
