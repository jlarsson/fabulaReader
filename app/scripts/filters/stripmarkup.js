'use strict';

angular.module('readerApp')
  .filter('stripMarkup', function () {
    return function (input) {
        //return String(input||'').replace(/<(?:.|\n)*?>/gm, '')||'vaffan?';
        return $('<div>'+input+'</div>').text()||input;
    };
  });
