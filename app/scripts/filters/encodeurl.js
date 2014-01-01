'use strict';

angular.module('readerApp')
  .filter('encodeUrl', ['$window', function ($window) {
    return function (url) {
      return $window.btoa(url);
    };
  }]);
