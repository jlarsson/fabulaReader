'use strict';

angular.module('readerApp')
  .controller('AppNavigationCtrl', ['$scope','Feeds', 'ViewStack', 'Banner', function ($scope, feeds, viewStack, banner) {
      $scope.header = 'Fabula';
      $scope.subscriptions = feeds.getSubscriptions();      
      $scope.indicateLoading = false;
      
      $scope.$on('app:setheader', function (event,args){
          $scope.header = args.title;
      });
      $scope.$on('app:setloading', function (event,args){
          $scope.indicateLoading = args.loading;
      });
      $scope.$on('app:subscriptionsChanged', function (event,args) {
          $scope.subscriptions = feeds.getSubscriptions();
      });
/*      
      $scope.$on('$routeChangeSuccess', function (event,current,previous){
          var x = 1;
      });
*/      
      $scope.setInheritedScopeVariable = function (childScope, name, value) {
          var scope = childScope;
          while (scope) {
              if (scope.hasOwnProperty(name)){
                  scope[name] = value;
                  return;
              }
              scope = scope.$parent;
          }
      };
  }]);
