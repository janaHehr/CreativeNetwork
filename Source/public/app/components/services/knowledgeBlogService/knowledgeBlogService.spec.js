'use strict';


describe('knowledgeBlogService', function() {

    var knowledgeBlogService;
    var $q;
    var $httpBackend;

    beforeEach(function() {
        module('knowledgeBlogService');
    });

    beforeEach(inject(function(_knowledgeBlogService_, _$q_, _$httpBackend_) {
        knowledgeBlogService = _knowledgeBlogService_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getEntries', function() {
        it('should get entries from API', function() {

            var data;

            $httpBackend.expectGET('/api/blog').respond(200, [{
                _id: 1
            }, {
                _id: 2
            }]);

            knowledgeBlogService.getEntries().then(function(_data) {
                data = _data;
            });

            $httpBackend.flush();

            expect(data.length).toBe(2);
        });
    });
});
