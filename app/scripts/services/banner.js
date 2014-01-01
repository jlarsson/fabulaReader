'use strict';

angular.module('readerApp')
    .service('Banner', ['$window', '$log',
        function ($window) {
            return;
            
            var adMob;

            var showAd = function () {
                adMob.showAd(
                    true,
                    function () {},
                    function () {
                        $log.error('Banner: showAd fail');
                    }
                );
            };

            var requestAd = function () {
                adMob.requestAd({
                        isTesting: false,
                        extras: {
                            color_bg: 'AAAAFF',
                            color_bg_top: 'FFFFFF',
                            color_border: 'FFFFFF',
                            color_link: '000080',
                            color_text: '808080',
                            color_url: '008000'
                        }
                    },
                    showAd,
                    function () {
                        $log.error('Banner: requestAd fail');
                    }
                );
            };

            $window.document.addEventListener("deviceready", function () {
                adMob = ($window.plugins || {}).AdMob;

                if (adMob) {
                    adMob.createBannerView({
                            publisherId: 'pub-4920891549718438',
                            adSize: adMob.AD_SIZE.BANNER
                        },
                        requestAd,
                        function () {
                            $log.error('Banner: createBannerView fail');
                        }
                    );
                }
            }, false);
}]);