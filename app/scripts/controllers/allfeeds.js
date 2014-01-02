'use strict';

angular.module('readerApp')
    .controller('AllFeedsCtrl', ['$scope', 'RouteState', 'Feeds',
        function ($scope, routeState, feeds) {
            var state = routeState.load($scope);

            $scope.state = 'loading';
            $scope.posts = [];
            $scope.appTitle();
            $scope.appLoading(true);

            var loadSuccess = function (posts) {
                state.posts = posts;
                state.restoreScroll();

                $scope.posts = posts || [];
                $scope.state = 'ready';
                $scope.viewMode = $scope.posts.length == 0 ? 'empty' :
                    _.some($scope.posts, function (p) {
                        return p.thumbnail.url;
                    }) ? 'thumbnails' : 'normal';

                $scope.appLoading(false);
            };
            var loadFail = function () {
                state.posts = null;
                $scope.state = 'error';
                $scope.appLoading(false);
            };

            if (state.posts) {
                loadSuccess(state.posts);
                return;
            }

            feeds.loadSubscribed()
                .then(loadSuccess, loadFail);
}]);