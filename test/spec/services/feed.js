'use strict';

describe('Service: Feed', function () {

  // load the service's module
  beforeEach(module('readerAppApp'));

  // instantiate service
  var Feed;
  beforeEach(inject(function (_Feed_) {
    Feed = _Feed_;
  }));

  it('should do something', function () {
    expect(!!Feed).toBe(true);
  });

});
