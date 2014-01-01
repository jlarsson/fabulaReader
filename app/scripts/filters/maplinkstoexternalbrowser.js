'use strict';

angular.module('readerApp')
    .filter('mapLinksToExternalBrowser', ['jquery','Settings',
        function ($, settings) {
            return function (input) {

                var container = $('<div></div>');
                container.html(input);

                $('*[href]',container).each(function (){
                    var $el = $(this);
                    var href = $el.attr('href');
                    $el.attr('href',settings.generateExternalHref(href));
                    $el.attr('data-post-x',href);
                });
                var s = container.html();
                return container.html();
            };
  }]);