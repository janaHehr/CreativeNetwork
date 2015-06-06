(function () {
	'use strict';

	angular.module('knowledgeBlog.article', ['showdown'])
		.config(defineRoutes)
		.controller('KnowledgeBlogArticleController', KnowledgeBlogArticleController)

	.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
		$scope.close = function () {
			$mdSidenav('right').close()
				.then(function () {
					$log.debug("close RIGHT is done");
				});
		};
	});

	function defineRoutes($routeProvider) {
		$routeProvider.when('/blog/:id', {
			templateUrl: 'app/knowledgeBlog/knowledgeBlogArticle/knowledgeBlogArticle.html',
			controller: 'KnowledgeBlogArticleController'
		});
	}

	function KnowledgeBlogArticleController($scope, knowledgeBlogService, $routeParams, $location, $timeout, $mdSidenav, $mdUtil, $log) {
		$scope.entries = [];
		$scope.article = {};
		$scope.toggleRight = buildToggler('right');

		/**
		 * Build handler to open/close a SideNav; when animation finishes
		 * report completion in console
		 */
		function buildToggler(navID) {
			var debounceFn = $mdUtil.debounce(function () {
				$mdSidenav(navID)
					.toggle()
					.then(function () {
						$log.debug("toggle " + navID + " is done");
					});
			}, 300);
			return debounceFn;
		}

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
				$scope.model.isEditMode = false;
		};

		$scope.Delete = function () {
			knowledgeBlogService.deleteBlogEntry($scope.article._id);
			$scope.model.isEditMode = false;
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
