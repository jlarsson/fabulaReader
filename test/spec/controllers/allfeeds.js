'use strict';

describe('Controller: AllfeedsCtrl', function () {

  // load the controller's module
  beforeEach(module('readerAppApp'));

  var AllfeedsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllfeedsCtrl = $controller('AllfeedsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
