'use strict';

angular.module('readerApp')
  .controller('SubscriptionCtrl', ['$scope','Feeds', function ($scope,feeds) {
    $scope.subscribed = feeds.isSubscribed($scope.feed.url);
    $scope.subscribe = function (subscribe){
        $scope.subscribed = feeds.subscribe($scope.feed,subscribe);
    };
  }]);
