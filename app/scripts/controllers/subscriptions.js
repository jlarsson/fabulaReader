'use strict';

angular.module('readerApp')
    .controller('SubscriptionsCtrl', ['$scope', 'RouteState', 'Feeds',
        function ($scope, routeState, feeds) {
            var state = routeState.load($scope);
            $scope.appTitle('My subscriptions');
            $scope.subscriptions = feeds.getSubscriptions();
            state.restoreScroll();
  }]);