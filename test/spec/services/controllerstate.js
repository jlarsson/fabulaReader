'use strict';

describe('Service: Controllerstate', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var Controllerstate;
  beforeEach(inject(function (_Controllerstate_) {
    Controllerstate = _Controllerstate_;
  }));

  it('should do something', function () {
    expect(!!Controllerstate).toBe(true);
  });

});
