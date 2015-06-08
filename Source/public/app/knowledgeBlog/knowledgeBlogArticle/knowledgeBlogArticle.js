(function () {
	'use strict';

	angular.module('knowledgeBlog.article', ['showdown'])
		.config(defineRoutes)
		.controller('KnowledgeBlogArticleController', KnowledgeBlogArticleController)

	.controller('SidebarController', function ($scope, $timeout, $mdSidenav, $log) {
		$scope.close = function () {
			$mdSidenav('sidebar').close();
			};
	});

	function defineRoutes($routeProvider) {
		$routeProvider
			.when('/blog/new', {
				templateUrl: 'app/knowledgeBlog/knowledgeBlogArticle/knowledgeBlogArticle.html',
				controller: 'KnowledgeBlogArticleController'
			})
			.when('/blog/:id', {
				templateUrl: 'app/knowledgeBlog/knowledgeBlogArticle/knowledgeBlogArticle.html',
				controller: 'KnowledgeBlogArticleController'
			});
	}

	function KnowledgeBlogArticleController($scope, knowledgeBlogService, $routeParams, $location, $timeout, $mdSidenav, $mdUtil, $log) {

		function buildToggler(navID) {
			var debounceFn = $mdUtil.debounce(function () {
				$mdSidenav(navID)
					.toggle();
			}, 300);
			return debounceFn;
		}

		function init() {
			//open existing dataset
			if($routeParams.id) {
				knowledgeBlogService.getBlogEntry($routeParams.id).then(function (entry) {
					$scope.article = entry;
				});
			}
			//new dataset:route /blog/new
			else {
				$scope.article = {};
				$scope.model.isEditMode=true;
			}

			knowledgeBlogService.getEntries().then(function (entries) {
				$scope.entries = entries;
			});
		}

		$scope.openSidebar = buildToggler('sidebar');

		// TODO: DRY
		$scope.openEntry = function (entry) {
			var path = '/blog/' + entry._id;
			$location.path(path);
		};

		$scope.save = function () {
			if(!$scope.form.$invalid) {
				if($routeParams.id) {
					knowledgeBlogService.updateBlogEntry($scope.article);
				}
				else {
					knowledgeBlogService.createBlogEntry($scope.article);
				}

				$scope.model.isEditMode = false;
			}
		};

		$scope.delete = function () {
			knowledgeBlogService.deleteBlogEntry($scope.article._id).then(function(){
				$location.path('/blog');
			},function(){
				//TODO: Fehlerfall behandeln
			});
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

		init();
	}
})();
