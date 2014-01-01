'use strict';

describe('Directive: hidebroken', function () {

  // load the directive's module
  beforeEach(module('readerAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hidebroken></hidebroken>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hidebroken directive');
  }));
});
