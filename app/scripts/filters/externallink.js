'use strict';

angular.module('readerApp')
  .filter('externalLink', ['Settings', function (settings) {
    return function (href) {
      return settings.generateExternalHref(href);
    };
  }]);
