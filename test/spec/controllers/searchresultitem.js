'use strict';

describe('Controller: SearchresultitemCtrl', function () {

  // load the controller's module
  beforeEach(module('readerApp'));

  var SearchresultitemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchresultitemCtrl = $controller('SearchresultitemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
