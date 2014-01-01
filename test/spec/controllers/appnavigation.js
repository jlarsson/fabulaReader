'use strict';

describe('Controller: AppnavigationCtrl', function () {

  // load the controller's module
  beforeEach(module('readerApp'));

  var AppnavigationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppnavigationCtrl = $controller('AppnavigationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
