'use strict';

describe('Service: Viewstack', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var Viewstack;
  beforeEach(inject(function (_Viewstack_) {
    Viewstack = _Viewstack_;
  }));

  it('should do something', function () {
    expect(!!Viewstack).toBe(true);
  });

});
