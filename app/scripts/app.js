'use strict';

angular.module('readerApp', [
  'ng',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'webStorageModule',
  'jmdobry.angular-cache'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/start.html',
                controller: 'StartCtrl'
            })
            .when('/allfeeds', {
                templateUrl: 'views/allfeeds.html',
                controller: 'AllFeedsCtrl'
            })
        
            .when('/trends', {
                templateUrl: 'views/trends.html',
                controller: 'TrendsCtrl'
            })
            .when('/subscriptions', {
                templateUrl: 'views/subscriptions.html',
                controller: 'SubscriptionsCtrl'
            })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .when('/search/:cat*', {
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .when('/feed/:encodedUrl*', {
                templateUrl: 'views/feed.html',
                controller: 'FeedCtrl'
            })
            .when('/post/:encodedUrl*', {
                templateUrl: 'views/post.html',
                controller: 'PostCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });