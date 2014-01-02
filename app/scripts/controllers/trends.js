'use strict';

angular.module('readerApp')
    .controller('TrendsCtrl', ['$scope', 'RouteState', 'Feeds',
        function ($scope, routeState, feeds) {
            var state = routeState.load($scope);

            $scope.trendingCategories = [];

            $scope.appLoading(true);
            $scope.appTitle('World trends');
            feeds.load('http://www.google.com/trends/hottrends/atom/hourly')
                .then(function (data, status, headers, config) {
                        $scope.trendingCategories = _.chain(data.posts)
                            .map(function (post) {
                                return post.content;
                            })
                            .map(function (text) {
                                //return text.match(/.+/ig);
                                return text.match(/<a href=".+?">(.+)<\/a>/ig) || [];
                            })
                            .flatten()
                            .map(function (s) {
                                return s.replace(/<\/?[^>]+(>|$)/g, '');
                            })
                            .shuffle()
                            .value();
                        $scope.appLoading(false);
                    },
                    function () {
                        $scope.appLoading(false);
                    });
  }]);