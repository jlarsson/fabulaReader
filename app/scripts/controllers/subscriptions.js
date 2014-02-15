'use strict';

angular.module('readerApp')
    .controller('SubscriptionsCtrl', ['$scope', 'Feeds',
        function ($scope, feeds) {
            $scope.appTitle('My subscriptions');
            $scope.subscriptions = feeds.getSubscriptions();
            $scope.retainScroll();
  }]);