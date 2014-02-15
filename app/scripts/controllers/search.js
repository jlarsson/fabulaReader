'use strict';

angular.module('readerApp')
    .controller('SearchCtrl', ['$scope', '$routeParams', 'Cache', 'Feeds',
        function ($scope, $routeParams, cache, feeds) {
            var queryCacheKey = 'SearchCtrl:query';
            
            $scope.appTitle('Find feeds');
            
            $scope.query = $routeParams.cat || cache.get(queryCacheKey) || '';
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
                    $scope.retainScroll();
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
                cache.update(queryCacheKey, search)
                performSearch(search);
            });
  }]);