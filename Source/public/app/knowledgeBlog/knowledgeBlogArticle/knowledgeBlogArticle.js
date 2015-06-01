(function () {
    'use strict';

    angular.module('knowledgeBlog.article', ['showdown'])
        .config(defineRoutes)
        .controller('KnowledgeBlogArticleController', KnowledgeBlogArticleController);

    function defineRoutes($routeProvider) {
        $routeProvider.when('/blog/:id', {
            templateUrl: 'app/knowledgeBlog/knowledgeBlogArticle/knowledgeBlogArticle.html',
            controller: 'KnowledgeBlogArticleController'
        });
    }

    function KnowledgeBlogArticleController($scope, knowledgeBlogService, $routeParams, $location) {
        $scope.entries = [];
        $scope.article = {};

        // TODO: DRY
        $scope.openEntry = function (entry) {
            var path = '/blog/' + entry._id;
            $location.path(path);
        };


        knowledgeBlogService.getBlogEntry($routeParams.id, function (entry) {
            $scope.article = entry;
        });

        knowledgeBlogService.getEntries().then(function (entries) {
            $scope.entries = entries;
        });

        $scope.Save = function () {
            knowledgeBlogService.updateBlogEntry($scope.article);
            $scope.model.isEditMode = !$scope.model.isEditMode;
        };

        $scope.Delete = function () {
            knowledgeBlogService.deleteBlogEntry($scope.article._id);
            $scope.model.isEditMode = !$scope.model.isEditMode;
        };

        $scope.model = {
            isEditMode: false,
            editorOptions: {
                lineWrapping: true,
                lineNumbers: true,
                autoCloseBrackets: true,
                //  theme: "monokai",
                //  readOnly: 'nocursor',
                mode: 'markdown'
            }
        };
    }
})();
