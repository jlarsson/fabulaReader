'use strict';

angular.module('readerApp')
    .controller('PostCtrl', ['$scope', '$routeParams', '$sce', 'RouteState', 'Cache', 'ViewStack',
        function ($scope, $routeParams, $sce, routeState, cache, viewStack) {
            var encodedUrl = $routeParams.encodedUrl;
            var state = routeState.load($scope);
            state.restoreScroll();

            $scope.post = state.post = (state.post || cache.get(encodedUrl)) || {
                link: '',
                title: 'Unable to load post',
                author: ''
            };
            $scope.$emit('app:setheader', {
                title: $scope.post.title
            });
  }]);