'use strict';

angular.module('readerApp')
    .service('GoogleFeeds', ['$http', '$q', '$angularCacheFactory', 'Settings',
        function ($http, $q, cacheFactory, settings) {
            var cache = cacheFactory('googleFeeds', {
                maxAge: 1000 * 60 * 10, // 10 minutes
                deleteOnExpire: 'aggressive',
                recycleFreq: 1000 * 60 // once a minute
            });
            
            var request = function (url){
                var deferred = $q.defer();
                var cachedData = cache.get(url);
                if (cachedData){
                    deferred.resolve(cachedData);
                }
                else{
                    var http = $http.jsonp(url);
                    http.success(function (data, status, headers, config){
                        cache.put(url,data);
                        deferred.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        cache.remove(url);
                        deferred.reject();
                    });
                }
                return deferred.promise;
            }
            
            
            
            this.search = function (query) {
                //return $http.jsonp('https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&callback=JSON_CALLBACK&q=' + query);
                return request('https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&callback=JSON_CALLBACK&q=' + encodeURIComponent(query));
            };
            
            this.load = function (url) {
                return request('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            };
  }]);