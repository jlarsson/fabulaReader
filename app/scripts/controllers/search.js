'use strict';

angular.module('readerApp')
    .controller('SearchCtrl', ['$scope', '$routeParams', 'RouteState', 'Feeds',
        function ($scope, $routeParams, routeState, feeds) {
            var state = routeState.load($scope);
            $scope.appTitle('Find feeds');
            
            $scope.query = $routeParams.cat || state.query || '';
            $scope.feeds = [];
            $scope.searchPending = false;
            $scope.searchPendingFor = '';
            

            var queuedQuery = '';
            var performSearch = function (query) {
                if ($scope.searchPending) {
                    $scope.state = 'ready';
                    queuedQuery = query;
                    return;
                }
                if (query.length < 2) {
                    $scope.state = $scope.feeds.length == 0 ? 'noinput' : 'ready';
                    return;
                }
                $scope.searchPending = true;
                $scope.searchPendingFor = query;

                var searchComplete = function (feeds){
                    $scope.state = feeds.length == 0 ? 'empty' : 'ready';
                    $scope.feeds = feeds;
                    $scope.searchPending = false;
                    if (queuedQuery) {
                        var q = queuedQuery;
                        queuedQuery = '';
                        performSearch(q);
                    }
                };
                feeds.search(query).then(
                    function (result) {
                        searchComplete(result.feeds);
                    },
                    function (data, status, headers, config) {
                        searchComplete([]);
                    });
            };

            $scope.$watch('searchPending', function (v) {
                $scope.appLoading(v);
            });

            $scope.$watch('query', function (search) {
                state.query = search;
                performSearch(search);
            });
  }]);