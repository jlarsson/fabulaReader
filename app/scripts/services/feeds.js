/*global angular: false */
'use strict';

angular.module('readerApp')
    .service('Feeds', ['$rootScope', '$q', '$http', 'GoogleFeeds', 'GoogleFeedMapper', 'webStorage', '_',
        function ($rootScope, $q, $http, googleFeeds, mapper, webStorage, _) {
            var cachedSubscriptions = null;
            var getCachedSubscriptions = function () {
                return cachedSubscriptions || (cachedSubscriptions = (webStorage.get('subscriptions') || {}));
            };
            var updateCachedSubscriptions = function (url, feed, force) {
                var subscriptions = getCachedSubscriptions();
                if (force || subscriptions.hasOwnProperty(url)) {
                    if (feed) {
                        // only update a feed with real changes
                        if (areEqualFeeds(subscriptions[url], feed)) {
                            return;
                        }
                        subscriptions[url] = feed;
                    } else {
                        delete subscriptions[url];
                    }
                    webStorage.add('subscriptions', subscriptions);
                    cachedSubscriptions = null;
                    $rootScope.$broadcast('app:subscriptionsChanged');
                }
            };
            var areEqualFeeds = function (a, b) {
                if (!(a && b)) {
                    return false;
                }
                return (a.author === b.author) && (a.description === b.description) && (a.link === b.link) && (a.title === b.title) && (a.url === b.url);
            };

            var isSubscribed = function (url) {
                return url && getCachedSubscriptions().hasOwnProperty(url);
            };
            var subscribe = function (feed, subscribe) {
                if (!(feed && feed.url)) {
                    return false;
                }

                var subscriptions = getCachedSubscriptions();
                if (subscribe) {
                    updateCachedSubscriptions(feed.url, feed, true);
                    return true;
                }
                updateCachedSubscriptions(feed.url, null, false);
                return false;
            };
            var getSubscription = function (url) {
                return getCachedSubscriptions[url];
            };

            var getSubscriptions = function () {
                return _.chain(getCachedSubscriptions())
                    .values()
                    .value();
            };

            var load = function (url) {
                var d = $q.defer();
                googleFeeds.load(url)
                    .then(function (data, status, headers, config) {
                            var result = mapper.mapGoogleLoadResult(url, data);

                            // sometimes the url is wrong
                            // the url from search might vary from teh actual feed
                            if ((url !== result.feed.url) && getCachedSubscriptions().hasOwnProperty(url)) {
                                // remove existing subscription
                                updateCachedSubscriptions(url, null, true);
                                updateCachedSubscriptions(feed.url, result.feed, true);
                            }

                            updateCachedSubscriptions(result.feed.url, result.feed, false);

                            d.resolve(result);
                        },
                        function (data, status, headers, config) {
                            d.reject();
                        });
                return d.promise;
            };
            var search = function (query) {
                var d = $q.defer();
                googleFeeds.search(query)
                    .then(function (data, status, headers, config) {
                            var feeds = mapper.mapGoogleSearchResult(data);
                            d.resolve({
                                query: query,
                                feeds: feeds
                            });
                        },
                        function (data, status, headers, config) {
                            d.reject();
                        });
                return d.promise;
            };
            var loadSubscribed = function () {
                var d = $q.defer();
                var promises = _.chain(getCachedSubscriptions())
                    .keys()
                    .map(function (url) {
                        return load(url);
                    })
                    .value();

                var pending = promises.length;
                if (pending == 0) {
                    d.resolve([]);
                    return d.promise;
                }

                var allPosts = [];
                var addResult = function (posts) {
                    if (posts) {
                        allPosts = allPosts.concat(posts);
                    }
                    --pending;
                    if (pending == 0) {
                        d.resolve(_.chain(allPosts)
                            .sortBy(function (post) {
                                return post.publishedDate;
                            })
                            .reverse()
                            .value()
                        );
                    }
                };
                _.each(promises, function (promise) {
                    promise.then(
                        function (result) {
                            addResult(result.posts);
                        },
                        function () {
                            addResult();
                        })
                });
                return d.promise;
            };



            this.isSubscribed = isSubscribed;
            this.subscribe = subscribe;
            this.getSubscription = getSubscription;
            this.getSubscriptions = getSubscriptions;
            this.load = load;
            this.search = search;
            this.loadSubscribed = loadSubscribed;
                }]);