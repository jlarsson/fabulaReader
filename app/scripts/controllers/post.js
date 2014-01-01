'use strict';

angular.module('readerApp')
    .controller('PostCtrl', ['$scope', '$routeParams', '$sce', 'Cache', 'ViewStack',
        function ($scope, $routeParams, $sce, cache, viewStack) {
            var encodedUrl = $routeParams.encodedUrl;
            $scope.post = cache.get(encodedUrl) || {
                link: '',
                title: 'Unable to load post',
                author: ''
            };
            $scope.$emit('app:setheader', {
                title: $scope.post.title
            });
  }]);