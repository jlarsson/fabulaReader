'use strict';

angular.module('readerApp')
    .controller('FeedCtrl', ['$scope', '$routeParams', 'Feeds', 'Cache', 'Encoder', '_', 'ViewStack',
        function ($scope, $routeParams, feeds, cache, encoder, _, viewStack) {

            var scrollRestoreEvent = viewStack.registerScrollRestore($scope);

            $scope.state = 'loading';


            var url = encoder.decodeUrl($routeParams.encodedUrl);
            $scope.url = url;
            $scope.feed = feeds.getSubscription(url) || {};
            $scope.posts = [];
            $scope.isSubscribed = feeds.isSubscribed($scope.feed.url);
            $scope.subscribe = function (subscribe) {
                feeds.subscribe($scope.feed, subscribe);
                $scope.isSubscribed = feeds.isSubscribed($scope.feed.url);
            };

            $scope.$emit('app:setloading', {
                loading: true
            });

            feeds.load(url)
                .then(
                    function (result) {
                        $scope.feed = result.feed;
                        $scope.posts = result.posts || [];
                        $scope.isSubscribed = feeds.isSubscribed($scope.feed.url);

                        $scope.state = 'ready';
                        $scope.viewMode = result.posts.length == 0 ? 'empty' :
                            _.some($scope.posts, function (p) {
                                return p.thumbnail.url;
                            }) ? 'thumbnails' : 'normal';



                        $scope.$emit('app:setheader', {
                            title: $scope.feed.title
                        });
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