'use strict';

describe('Filter: howlongago', function () {

  // load the filter's module
  beforeEach(module('readerApp'));

  // initialize a new instance of the filter before each test
  var howlongago;
  beforeEach(inject(function ($filter) {
    howlongago = $filter('howlongago');
  }));

  it('should return the input prefixed with "howlongago filter:"', function () {
    var text = 'angularjs';
    expect(howlongago(text)).toBe('howlongago filter: ' + text);
  });

});
