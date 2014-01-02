'use strict';

angular.module('readerApp')
    .controller('RootCtrl', ['$scope', 'Feeds', 'Encoder',
        function ($scope, feeds, encoder) {
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
            }
        }]);