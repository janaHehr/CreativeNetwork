'use strict';


describe('knowledgeBlog', function() {

    var knowledgeBlogService;
    var $location;
    var $scope;
    var $filter;

    beforeEach(function() {
        angular.module('showdown', []);
        angular.mock.module('ngRoute', 'showdown', 'knowledgeBlog.article', 'cutString', 'knowledgeBlogService');
        module('knowledgeBlog');
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, _knowledgeBlogService_, _$location_, _$filter_) {
        knowledgeBlogService = _knowledgeBlogService_;
        $location = _$location_;
        $scope = _$rootScope_.$new();
        $filter = _$filter_;

        _$controller_('KnowledgeBlogController', {
            $scope: $scope,
            knowledgeBlogService: knowledgeBlogService,
            $location: $location,
            $filter: $filter
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
        xit('should call the cutString filter', function() {

            // TODO: how to spy on a filter??
            spyOn($filter, '??');

            expect($filter).toHaveBeenCalledWith('cutString');
            // expect($filter).toHaveBeenCalledWith(content, true, 400, '...');
        });
    });

});
