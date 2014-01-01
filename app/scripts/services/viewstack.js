(function (angular) {
    'use strict';

    angular.module('readerApp').service('ViewStack', [
        '$rootScope', '$timeout', '$window', 'jquery', '$log',
        function ($rootScope, $timeout, $window, $, $log) {
            var stack = [];
            var ensureEntry = function () {
                var l = $window.history.length;
                stack.length = l;
                var entry = stack[l - 1];
                if (!entry) {
                    entry = stack[l - 1] = {
                        stateHolder: {},
                        top: 0,
                        restoreRequested: false,
                        restorePossible: false,
                        tryRestore: function () {
                            if (this.restoreRequested && this.restorePossible) {
                                this.restoreRequested = this.restorePossible = false;
                                var top = this.top || 0;
                                $timeout(function () {
                                    $log.debug('scrollTo:0,' + angular.toJson(top));
                                    $window.scrollTo(0, top);
                                });
                            }
                        }
                    };
                }
                return entry;
            };
            
            this.getState = function (){
                return ensureEntry().stateHolder;
            };
            /*
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                //$log.debug('$routeChangeStart:' + current.$$route.templateUrl + ' -> ' + next.$$route.templateUrl );
            });
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                $log.debug('$routeChangeSuccess:' + angular.toJson(stack));
                //$log.debug('$routeChangeSuccess:' + previous.$$route.templateUrl + ' -> ' + current.$$route.templateUrl );
            });
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                //$log.debug('$routeChangeError');
            });
            $rootScope.$on('$routeUpdate', function (event, current, previous) {
                //$log.debug('$routeUpdate:' + previous.$$route.templateUrl + ' -> ' + current.$$route.templateUrl );
            });
            */

            $($window).on('popstate', function () {
                //$log.debug('$popstate:' + angular.toJson(stack));
                // did we have a request for scroll restore?
                var ce = ensureEntry();
                ce.restorePossible = true;
                ce.tryRestore();
            });

            this.registerScrollRestore = function (scope) {
                //$log.debug('register');

                scope.$on('$destroy', function () {
                    var ce = ensureEntry();
                    ce.top = $window.pageYOffset;
                    ce.restorePossible = false;
                    ce.restoreRequested = false;
                    //$log.debug('$destroy:' + angular.toJson(stack));
                });

                return function () {
                    var ce = ensureEntry();
                    //$log.debug('restore');
                    ce.restoreRequested = true;
                    ce.tryRestore();
                };
            };
        }]);
}(angular));