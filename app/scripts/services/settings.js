'use strict';

angular.module('readerApp')
    .service('Settings', ['$window','post_href_handler_name',
        function ($window,post_href_handler_name) {
            var isMobile = !!$window.cordova;
            
            this.canUseAjax = function () {
                // we can only use ajax on phones, i.e. where cordova is defined
                // otherwise, jsonp is recommended
                //return isMobile;

                // NOTE: As for now, we cant set refer on android (chromium), preventing us from using google feed api
                return false;
            };

            this.generateExternalHref = function (url) {
                return 'javascript:' + post_href_handler_name + '(\'' + $window.btoa(url) + '\')';
            }
            
            $window[post_href_handler_name] = function (url){
                if (isMobile){
                    navigator.app.loadUrl($window.atob(url), { openExternal: true });
                }
                else{
                    $window.open($window.atob(url));
                }
            };
  }]);