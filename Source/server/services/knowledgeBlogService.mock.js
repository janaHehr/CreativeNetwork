(function () {
	'use strict';

	exports.createBlogEntry = function (title, author, content) {


	};

	exports.getAllBlogEntries = function (callback) {
		var mock = [];

		for (var i = 0; i < 100; i++) {
			mock.push({
				_id: i,
				title: 'Ein super langer Titel ' + i,
				author: 'Thomas Klepzig',
				content: '# test'
			});
		}

		callback(mock);
	};
})();
