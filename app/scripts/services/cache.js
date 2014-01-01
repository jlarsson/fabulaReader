'use strict';

angular.module('readerApp')
    .service('Cache', function Cache() {
        var keys = [];
        var cache = {};
        var remove = function (key) {
            if (key in cache) {
                delete cache[key];
                keys = _.chain(keys).filter(function (k) { return k !== key; }).value();
            };
        }
        var update = function (key, data) {
            remove(key);
            cache[key] = data;
            keys.push(key);
        };
        this.get = function (key) {
            return cache[key];
        };
        this.update = update;
    });
