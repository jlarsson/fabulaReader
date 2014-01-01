'use strict';

angular.module('readerApp')
    .filter('favicon', function () {
            return function (input) {
                var m = input.match(/((http|https):\/\/[^\/]*)/ig);
                    return m.length ? m[0] + '/favicon.ico' : null;
                };
            });