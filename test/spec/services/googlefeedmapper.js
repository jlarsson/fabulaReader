'use strict';

describe('Service: Googlefeedmapper', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var Googlefeedmapper;
  beforeEach(inject(function (_Googlefeedmapper_) {
    Googlefeedmapper = _Googlefeedmapper_;
  }));

  it('should do something', function () {
    expect(!!Googlefeedmapper).toBe(true);
  });

});
