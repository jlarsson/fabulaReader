'use strict';

describe('Service: Encoder', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var Encoder;
  beforeEach(inject(function (_Encoder_) {
    Encoder = _Encoder_;
  }));

  it('should do something', function () {
    expect(!!Encoder).toBe(true);
  });

});
