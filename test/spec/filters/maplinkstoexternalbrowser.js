'use strict';

describe('Filter: mapLinksToExternalBrowser', function () {

  // load the filter's module
  beforeEach(module('readerAppApp'));

  // initialize a new instance of the filter before each test
  var mapLinksToExternalBrowser;
  beforeEach(inject(function ($filter) {
    mapLinksToExternalBrowser = $filter('mapLinksToExternalBrowser');
  }));

  it('should return the input prefixed with "mapLinksToExternalBrowser filter:"', function () {
    var text = 'angularjs';
    expect(mapLinksToExternalBrowser(text)).toBe('mapLinksToExternalBrowser filter: ' + text);
  });

});
