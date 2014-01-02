'use strict';

angular.module('readerApp')
    .controller('RootCtrl', ['$scope','Feeds', 'Encoder',
        function ($scope, feeds, encoder) {
            $scope.header = 'Fabula';
            $scope.subscriptions = feeds.getSubscriptions();
            $scope.indicateLoading = false;

            $scope.$on('app:setheader', function (event, args) {
                $scope.header = args.title;
            });
            $scope.$on('app:setloading', function (event, args) {
                $scope.indicateLoading = args.loading;
            });
            $scope.$on('app:subscriptionsChanged', function (event, args) {
                $scope.subscriptions = feeds.getSubscriptions();
            });
            
            
            var currentParam = null;
            var pushParam = function (key,value){
                currentParam = {key:key, value: value};
            };
            var popParam = function (key){
                if (currentParam && (currentParam.key === key)){
                    return currentParam.value;
                }
            };
            $scope.pushPost = function (post){
                pushParam(encoder.encodeUrl(post.url), post);
            };
            $scope.popPost = function (encodedUrl){
                return popParam(encodedUrl);
            };
        }]);