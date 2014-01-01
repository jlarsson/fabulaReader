'use strict';

angular.module('readerApp')
  .service('Encoder', ['$window', function Encoder($window) {
      this.encodeUrl = function (url) {
          return $window.btoa(url);
      };
      this.decodeUrl = function (urlEncoding) {
          return $window.atob(urlEncoding);
      };
    
  }]);
