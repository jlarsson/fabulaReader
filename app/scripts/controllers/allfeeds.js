'use strict';

angular.module('readerApp')
    .controller('AllFeedsCtrl', ['$scope', 'Feeds', 'Cache', 'Encoder', 'ViewStack',
        function ($scope, feeds, cache, encoder, viewStack) {
            var scrollRestoreEvent = viewStack.registerScrollRestore($scope);

            $scope.state = 'loading';
            $scope.posts = [];

            $scope.$emit('app:setloading', {
                loading: true
            });

            feeds.loadSubscribed()
                .then(function (posts) {
                        $scope.posts = posts || [];

                        $scope.state = 'ready';
                        $scope.viewMode = $scope.posts.length == 0 ? 'empty' :
                            _.some($scope.posts, function (p) {
                                return p.thumbnail.url;
                            }) ? 'thumbnails' : 'normal';

                        $scope.$emit('app:setloading', {
                            loading: false
                        });
                        scrollRestoreEvent();
                    },
                    function (err) {
                        $scope.state = 'error';
                        $scope.$emit('app:setloading', {
                            loading: false
                        });
                    }
            );
            $scope.cachePost = function (post) {
                cache.update(encoder.encodeUrl(post.url), post);
            };


        }]);