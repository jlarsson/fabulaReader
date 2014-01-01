'use strict';

describe('Filter: externallink', function () {

  // load the filter's module
  beforeEach(module('readerAppApp'));

  // initialize a new instance of the filter before each test
  var externallink;
  beforeEach(inject(function ($filter) {
    externallink = $filter('externallink');
  }));

  it('should return the input prefixed with "externallink filter:"', function () {
    var text = 'angularjs';
    expect(externallink(text)).toBe('externallink filter: ' + text);
  });

});
