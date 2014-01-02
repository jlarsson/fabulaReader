'use strict';

angular.module('readerApp')
    .controller('SearchCtrl', ['$scope', '$routeParams', 'RouteState', 'Feeds', 'ControllerState',
        function ($scope, $routeParams, routeState, feeds, controllerState) {
            routeState.load($scope);
            $scope.$emit('app:setheader', {
                title: 'Find feeds'
            });
            
            var state = controllerState.enterController($scope);
            $scope.query = $routeParams.cat || state.query || '';
            $scope.feeds = [];
            $scope.searchPending = false;
            $scope.searchPendingFor = '';
            

            var queuedQuery = '';
            var performSearch = function (query) {
                if ($scope.searchPending) {
                    queuedQuery = query;
                    return;
                }
                if (query.length < 2) {
                    return;
                }
                $scope.searchPending = true;
                $scope.searchPendingFor = query;

                feeds.search(query).then(
                    function (result) {
                        $scope.feeds = result.feeds;
                        $scope.searchPending = false;
                        if (queuedQuery) {
                            var q = queuedQuery;
                            queuedQuery = '';
                            performSearch(q);
                        }
                    },
                    function (data, status, headers, config) {
                        $scope.searchPending = false;
                    });
            };

            $scope.$watch('searchPending', function (v) {
                $scope.$emit('app:setloading', {
                    loading: v
                });
            });

            $scope.$watch('query', function (search) {
                state.query = search;
                performSearch(search);
            });
  }]);