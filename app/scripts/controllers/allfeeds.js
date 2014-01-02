'use strict';

angular.module('readerApp')
    .controller('AllFeedsCtrl', ['$scope', 'RouteState', 'Feeds', 'Cache', 'Encoder', 'ViewStack',
        function ($scope, routeState, feeds, cache, encoder) {
            var state = routeState.load($scope);

            $scope.state = 'loading';
            $scope.posts = [];
            $scope.$emit('app:setloading', {
                loading: true
            });

            $scope.cachePost = function (post) {
                cache.update(encoder.encodeUrl(post.url), post);
            };

            var loadSuccess = function (posts) {
                state.posts = posts;
                state.restoreScroll();

                $scope.posts = posts || [];
                $scope.state = 'ready';
                $scope.viewMode = $scope.posts.length == 0 ? 'empty' :
                    _.some($scope.posts, function (p) {
                        return p.thumbnail.url;
                    }) ? 'thumbnails' : 'normal';

                $scope.$emit('app:setloading', {
                    loading: false
                });
            };
            var loadFail = function () {
                state.posts = null;
                $scope.state = 'error';
                $scope.$emit('app:setloading', {
                    loading: false
                });
            };

            if (state.posts) {
                loadSuccess(state.posts);
                return;
            }

            feeds.loadSubscribed()
                .then(loadSuccess, loadFail);
}]);