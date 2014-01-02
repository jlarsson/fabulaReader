'use strict';

angular.module('readerApp')
    .controller('SubscriptionsCtrl', ['$scope', 'RouteState', 'Feeds', 'ViewStack',
        function ($scope, routeState, feeds, viewStack) {
            routeState.load($scope);
            $scope.$emit('app:setheader', {
                title: 'My subscriptions'
            });
            $scope.subscriptions = feeds.getSubscriptions();
  }]);