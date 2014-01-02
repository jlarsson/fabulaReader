'use strict';

angular.module('readerApp')
    .controller('FeedCtrl', ['$scope', '$routeParams', '$log', '_', 'RouteState', 'Feeds', 'Encoder',
        function ($scope, $routeParams, $log, _, routeState, feeds, encoder) {
            var url = encoder.decodeUrl($routeParams.encodedUrl);

            var state = routeState.load($scope);
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
                state.loadResult = result;
                state.restoreScroll();
                $scope.feed = result.feed;
                $scope.posts = result.posts || [];
                $scope.isSubscribed = feeds.isSubscribed($scope.feed.url);

                $scope.state = 'ready';
                $scope.viewMode = result.posts.length == 0 ? 'empty' :
                    _.some($scope.posts, function (p) {
                        return p.thumbnail.url;
                    }) ? 'thumbnails' : 'normal';



                $scope.appTitle($scope.feed.title);
                $scope.appLoading(false);

            };
            if (state.loadResult) {
                setLoadResult(state.loadResult);
                return;
            }
            feeds.load(url)
                .then(
                    setLoadResult,
                    function (err) {
                        $scope.state = 'error';
                        $scope.appLoading(false);
                    });
}]);