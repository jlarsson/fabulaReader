'use strict';

describe('Service: Routestate', function () {

  // load the service's module
  beforeEach(module('readerApp'));

  // instantiate service
  var Routestate;
  beforeEach(inject(function (_Routestate_) {
    Routestate = _Routestate_;
  }));

  it('should do something', function () {
    expect(!!Routestate).toBe(true);
  });

});
