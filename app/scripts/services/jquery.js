'use strict';

angular.module('readerApp')
    .factory('jquery', ['$window',function ($window) { return $window.jQuery; }
]);