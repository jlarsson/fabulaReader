'use strict';

angular.module('readerApp')
    .constant('post_href_handler_name', 'open_post_link_' + Math.floor(Math.random() * 10000000))
    .config([
    '$compileProvider','post_href_handler_name',

    function ($compileProvider,post_href_handler_name)
    {
        $compileProvider.aHrefSanitizationWhitelist(
            RegExp('^\s*((file|http|https):|javascript:' + post_href_handler_name + '\\()'));
        
}])