'use strict';

describe('Service: Configurelinks', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var Configurelinks;
  beforeEach(inject(function (_Configurelinks_) {
    Configurelinks = _Configurelinks_;
  }));

  it('should do something', function () {
    expect(!!Configurelinks).toBe(true);
  });

});
