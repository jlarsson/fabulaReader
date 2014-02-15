'use strict';

angular.module('readerApp')
    .controller('AllFeedsCtrl', ['$scope', 'Feeds',
        function ($scope, feeds) {
            $scope.state = 'loading';
            $scope.posts = [];
            $scope.appTitle();
            $scope.appLoading(true);

            var loadSuccess = function (posts) {
                $scope.retainScroll();

                $scope.posts = posts || [];
                $scope.state = 'ready';
                $scope.appLoading(false);
            };
            var loadFail = function () {
                state.posts = null;
                $scope.state = 'error';
                $scope.appLoading(false);
            };

            feeds.loadSubscribed()
                .then(loadSuccess, loadFail);
}]);