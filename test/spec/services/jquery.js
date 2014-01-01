'use strict';

describe('Service: jquery', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var jquery;
  beforeEach(inject(function (_jquery_) {
    jquery = _jquery_;
  }));

  it('should do something', function () {
    expect(!!jquery).toBe(true);
  });

});
