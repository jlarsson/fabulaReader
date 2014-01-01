'use strict';

describe('Filter: stripMarkup', function () {

  // load the filter's module
  beforeEach(module('readerAppApp'));

  // initialize a new instance of the filter before each test
  var stripMarkup;
  beforeEach(inject(function ($filter) {
    stripMarkup = $filter('stripMarkup');
  }));

  it('should return the input prefixed with "stripMarkup filter:"', function () {
    var text = 'angularjs';
    expect(stripMarkup(text)).toBe('stripMarkup filter: ' + text);
  });

});
