'use strict';

angular.module('readerApp')
    .controller('FeedCtrl', ['$scope', '$routeParams', '$log', '_', 'Feeds', 'Encoder',
        function ($scope, $routeParams, $log, _, feeds, encoder) {
            var url = encoder.decodeUrl($routeParams.encodedUrl);

            $scope.state = 'loading';
            $scope.url = url;
            $scope.feed = feeds.getSubscription(url) || {};
            $scope.posts = [];
            $scope.isSubscribed = feeds.isSubscribed($scope.feed.url);
            $scope.subscribe = function (subscribe) {
                feeds.subscribe($scope.feed, subscribe);
                $scope.isSubscribed = feeds.isSubscribed($scope.feed.url);
            };

            $scope.appLoading(true);

            var setLoadResult = function (result) {
                $scope.retainScroll();

                $scope.feed = result.feed;
                $scope.posts = result.posts || [];
                $scope.isSubscribed = feeds.isSubscribed($scope.feed.url);

                $scope.state = 'ready';
                $scope.appTitle($scope.feed.title);
                $scope.appLoading(false);

            };
            feeds.load(url)
                .then(
                    setLoadResult,
                    function (err) {
                        $scope.state = 'error';
                        $scope.appLoading(false);
                    });
}]);