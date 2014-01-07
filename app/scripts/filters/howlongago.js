'use strict';

angular.module('readerApp')
    .constant('howLongAgoLookup', [
        {max: 60, caption: function (d) { return 'a moment ago'; }},
        {max: 60*2, caption: function (d) { return 'a minute ago'; }},
        {max: 60*60, caption: function (d) { return Math.floor(d/60) + ' minutes ago'; }},
        {max: 2*60*60, caption: function (d) { return '1 hour ago'; }},
        {max: 24*60*60, caption: function (d) { return Math.floor(d/3600) + ' hours ago'; }},
        {max: 2*24*60*60, caption: function (d) { return 'yesterday'; }},
        {max: 7*24*60*60, caption: function (d) { return Math.floor(d/86400) + ' days ago'; }}, 
        {max: 28*24*60*60, caption: function (d) { return Math.floor(d/604800) + ' weeks ago'; }}, 
        {max: 9007199254740992, caption: function (d) { return Math.floor(d/2419200) + ' months ago'; }}
        
    ]);
angular.module('readerApp')
    .filter('howLongAgo', ['howLongAgoLookup', function (lookup) {
        return function (input) {
            var date = new Date(input);
            var now = new Date();

            var diffInSeconds = (now.getTime() - date.getTime())/1000;
            
            for(var i = 0; i < lookup.length; ++i){
                var l = lookup[i];
                if (diffInSeconds < l.max){
                    return l.caption(diffInSeconds);
                }
            }
            return 'Very long time ago';
        };
    }]);