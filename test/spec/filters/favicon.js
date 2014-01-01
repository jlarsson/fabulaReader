'use strict';

describe('Filter: favicon', function () {

  // load the filter's module
  beforeEach(module('readerAppApp'));

  // initialize a new instance of the filter before each test
  var favicon;
  beforeEach(inject(function ($filter) {
    favicon = $filter('favicon');
  }));

  it('should return the input prefixed with "favicon filter:"', function () {
    var text = 'angularjs';
    expect(favicon(text)).toBe('favicon filter: ' + text);
  });

});
