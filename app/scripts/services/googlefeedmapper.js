/************************************************

map data from google feed apis json format 
to application native format

************************************************/

'use strict';

angular.module('readerApp')
    .service('GoogleFeedMapper', ['_',
        function (_) {
            var normalizeFeed = function (feed){
                return {
                    author: feed.author,
                    title: feed.title,
                    description: feed.description,
                    link: feed.link,
                    url: feed.url
                }
            };
            
            var mapGoogleLoadResult = function (url, data) {
                var gfeed = (((data || {}).responseData || {}).feed || {});
                var gentries = gfeed.entries || [];
                var feed = normalizeFeed({
                    author: gfeed.author,
                    title: gfeed.title,
                    description: gfeed.description,
                    link: gfeed.link,
                    url: gfeed.feedUrl || url
                });

                var posts = _.chain(gentries)
                    .map(function (e) {
                        var thumbnails = _.chain(e.mediaGroups||[])
                                .map(function (g){ return g.contents; })
                                .flatten()
                                .filter(function (m) { 
                                    return m.medium === 'image'; 
                                })
                                .sortBy(function (m) { 
                                    return m.width; 
                                });
                        // try get bigggest thumnail smaller than threshold
                        // or else the first one (which then should be big but still smallest)
                        var thumbnail = 
                            thumbnails.filter(function (m) { return m.width < 256; }).last().value()
                            || thumbnails.first().value()
                            || {};
                        var post = {
                            feed: feed,
                            url: e.url,
                            title: e.title,
                            link: e.link,
                            author: e.author,
                            publishedDate: new Date(e.publishedDate),
                            contentSnippet: e.contentSnippet,
                            content: e.content,
                            categories: e.categories,
                            thumbnail: thumbnail
                        };
                        return post;
                    })
                    .value();
                return {
                    feed: feed,
                    posts: posts
                };
            };
            
            var mapGoogleSearchResult = function (data){
                var gentries = ((data||{}).responseData||{}).entries||[];
                // make sure entries are distinct
                var urls = {};
                var feeds = _.chain(gentries)
                    .map(function (e) {
                        if (!(urls.hasOwnProperty(e.url))) {
                            urls[e.url] = true;
                            return e;
                        }
                        return null;
                    })
                    .filter(function (e) {
                        return e !== null;
                    })
                    .map(function (f) { return normalizeFeed(f); })
                    .value();
                return feeds;
            };
            
            this.normalizeFeed = normalizeFeed;
            this.mapGoogleLoadResult = mapGoogleLoadResult;
            this.mapGoogleSearchResult = mapGoogleSearchResult;
  }]);