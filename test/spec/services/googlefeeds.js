'use strict';

describe('Service: Googlefeeds', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var Googlefeeds;
  beforeEach(inject(function (_Googlefeeds_) {
    Googlefeeds = _Googlefeeds_;
  }));

  it('should do something', function () {
    expect(!!Googlefeeds).toBe(true);
  });

});
