'use strict';

describe('Directive: drawerSubscribed', function () {

  // load the directive's module
  beforeEach(module('readerAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<drawer-subscribed></drawer-subscribed>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the drawerSubscribed directive');
  }));
});
