'use strict';

angular.module('readerApp')
    .controller('TrendsCtrl', ['$scope', 'RouteState', 'Feeds',
        function ($scope, routeState, feeds) {
            var state = routeState.load($scope);

            $scope.trendingCategories = [];

            $scope.$emit('app:setloading', {
                loading: true
            });
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
                        $scope.$emit('app:setloading', {
                            loading: false
                        });
                    },
                    function () {
                        $scope.$emit('app:setloading', {
                            loading: false
                        });
                    });
  }]);