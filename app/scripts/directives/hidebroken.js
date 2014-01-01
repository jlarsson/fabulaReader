'use strict';

angular.module('readerApp')
    .directive('hidebroken', ['jquery',
        function ($) {
            return {
                template: '<div></div>',
                restrict: 'AE',
                link: function (scope, element, attrs) {
                    $(element).error(function (){ $(this).hide(); });
                }
            };
  }]);