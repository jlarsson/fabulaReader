'use strict';

angular.module('readerApp')
    .controller('RootCtrl', ['$scope', '$window', '$timeout', '$location', '_', 'Feeds', 'Encoder',
        function ($scope, $window, $timeout, $location, _, feeds, encoder) {
            var defaultTitle = 'Fabula Reader';
            $scope.header = defaultTitle;
            $scope.subscriptions = feeds.getSubscriptions();
            $scope.indicateLoading = false;

            $scope.$on('app:setheader', function (event, args) {
                $scope.header = args.title;
            });
            $scope.$on('app:setloading', function (event, args) {
                $scope.indicateLoading = args.loading;
            });
            $scope.$on('app:subscriptionsChanged', function (event, args) {
                $scope.subscriptions = feeds.getSubscriptions();
            });


            var currentParam = null;
            var pushParam = function (key, value) {
                currentParam = {
                    key: key,
                    value: value
                };
            };
            var popParam = function (key) {
                if (currentParam && (currentParam.key === key)) {
                    return currentParam.value;
                }
            };
            $scope.pushPost = function (post) {
                pushParam(encoder.encodeUrl(post.url), post);
            };
            $scope.popPost = function (encodedUrl) {
                return popParam(encodedUrl);
            };

            $scope.appTitle = function (title) {
                $scope.header = title || defaultTitle;
            };
            $scope.appLoading = function (loading) {
                $scope.indicateLoading = loading;
            };
            
            // Retain scrollpos for each view
            $scope.retainScrollCache = {};
            
            $scope.$on('$routeChangeStart', function() {
                _.chain($scope.retainScrollCache).each(function (k,c) {c.active = false;});
            });            
            $window.addEventListener('scroll', function (){
                var c = $scope.retainScrollCache[$location.path()];
                if ((c) && c.active) {
                    c.y = $window.pageYOffset;
                }
                //$scope.scroll.posCache[$location.path()] = $window.pageYOffset;
            });
            $scope.retainScroll = function (){
                var c = $scope.retainScrollCache[$location.path()] || ($scope.retainScrollCache[$location.path()] = {active:true,y:0});
                $timeout(function() {
                        $(window).scrollTop(c.y);
                    }, 0);  
            };
        }]);