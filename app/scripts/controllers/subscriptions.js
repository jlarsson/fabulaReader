'use strict';

angular.module('readerApp')
    .controller('SubscriptionsCtrl', ['$scope', 'Feeds', 'ViewStack',
        function ($scope, feeds, viewStack) {
            $scope.$emit('app:setheader', {
                title: 'My subscriptions'
            });
            $scope.subscriptions = feeds.getSubscriptions();
  }]);