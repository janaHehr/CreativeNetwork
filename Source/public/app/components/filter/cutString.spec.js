'use strict';

describe('cutString', function() {

    var $filter;

    beforeEach(function() {
        module('cutString');
    });

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    it('has a cutString filter', function() {
        expect($filter('cutString')).not.toBeNull();
    });

    it('should not change the length if it is smaller than 10 chars', function() {

        var content = '';

        for (var i = 0; i < 10; i++) {
            content += 'f';
        }

        var result = $filter('cutString')(content, true, 10, '...');
        expect(result.length).toBe(content.length);
    });

    it('should cut the content to 10 chars and append "..." if it is larger than 10 chars', function() {

        var content = '';

        for (var i = 0; i < 11; i++) {
            content += 'f';
        }

        var result = $filter('cutString')(content, true, 10, '...');
        expect(result.length).toBe(13);
        expect(result[10]).toBe('.');
        expect(result[11]).toBe('.');
        expect(result[12]).toBe('.');
    });
});
