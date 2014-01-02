'use strict';

angular.module('readerApp')
    .controller('PostCtrl', ['$scope', '$routeParams', 'RouteState',
        function ($scope, $routeParams, routeState) {
            var encodedUrl = $routeParams.encodedUrl;
            var state = routeState.load($scope);
            state.restoreScroll();

            $scope.post = state.post = (state.post || $scope.popPost(encodedUrl)) || {
                link: '',
                title: 'Unable to load post',
                author: ''
            };
            $scope.appTitle($scope.post.title);
  }]);