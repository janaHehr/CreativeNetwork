(function() {
  'use strict';

	angular.module('error', [])
		.config(defineRoutes);

  function defineRoutes($routeProvider) {
		$routeProvider
			.when('/error/404', {
				templateUrl: 'app/error/404.html'
			});
  }
	})();
