'use strict';

angular.module('readerApp')
    .controller('PostCtrl', ['$scope', '$routeParams', 
        function ($scope, $routeParams) {
            var encodedUrl = $routeParams.encodedUrl;

            $scope.retainScroll();
            $scope.post = $scope.popPost(encodedUrl) || {
                link: '',
                title: 'Unable to load post',
                author: '',
                feed: {title: 'Unable to load post'}
            };
            $scope.appTitle($scope.post.feed.title);
  }]);