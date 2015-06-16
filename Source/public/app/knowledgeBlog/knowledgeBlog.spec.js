'use strict';


describe('knowledgeBlog', function() {

    var knowledgeBlogService;
    var $location;
    var $scope;

    beforeEach(function() {
        angular.module('showdown', []);
        angular.mock.module('ngRoute', 'showdown', 'knowledgeBlog.article', 'cutString', 'knowledgeBlogService');
        module('knowledgeBlog');
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, _knowledgeBlogService_, _$location_, _$filter_) {
        knowledgeBlogService = _knowledgeBlogService_;
        $location = _$location_;
        $scope = _$rootScope_.$new();

        _$controller_('KnowledgeBlogController', {
            $scope: $scope,
            knowledgeBlogService: knowledgeBlogService,
            $location: $location,
            $filter: _$filter_
        });
    }));

    describe('$scope', function() {
        it('should have entries', function() {
            expect($scope.entries).toBeDefined();
        });

        it('should have selectedEntry', function() {
            expect($scope.selectedEntry).toBeDefined();
        });
    });

    describe('openEntry', function() {
        it('should change location to /blog/:id', function() {
            spyOn($location, 'path');
            $scope.openEntry({
                _id: 42
            });
            //see documentation of jasmine for all function names
            expect($location.path).toHaveBeenCalledWith('/blog/42');
        });

        it('should not change location if no entry with an id is given', function() {
            spyOn($location, 'path');
            $scope.openEntry({});

            //see documentation of jasmine for all function names
            expect($location.path).not.toHaveBeenCalled();
        });

        it('should not change location if no entry is given at all', function() {
            spyOn($location, 'path');
            $scope.openEntry();

            //see documentation of jasmine for all function names
            expect($location.path).not.toHaveBeenCalled();
        });
    });

    describe('createBlogEntry', function() {
        it('should change location to /blog/new', function() {
            spyOn($location, 'path');
            $scope.createBlogEntry();
            expect($location.path).toHaveBeenCalledWith('/blog/new');
        });
    });

    describe('getContent', function() {
        it('should not change the length if it is smaller than 400 chars', function() {

            var content = '';

            for (var i = 0; i < 400; i++) {
                content += 'f';
            }

            var result = $scope.getContent(content);
            expect(result.length).toBe(content.length);
        });

        it('should cut the content to 400 chars and append "..." if it is larger than 400 chars', function() {

            var content = '';

            for (var i = 0; i < 401; i++) {
                content += 'f';
            }

            var result = $scope.getContent(content);
            expect(result.length).toBe(403);
            expect(result[400]).toBe('.');
            expect(result[401]).toBe('.');
            expect(result[402]).toBe('.');
        });
    });

});
