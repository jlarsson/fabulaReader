'use strict';

angular.module('readerApp')
    .service('RouteState', ['$rootScope', '$window', '$timeout', '$log',
        function ($rootScope, $window, $timeout, $log) {
            function State() {
                var scrollTop = 0;

                this.bindToScope = function (scope) {
                    scope.$on('$destroy', function () {
                        scrollTop = $window.pageYOffset;
                    });
                };
                this.restoreScroll = function () {
                    $timeout(function () {
                        $window.scrollTo(0, scrollTop);
                    });
                };
            };

            var currentRoute;
            var routeStates = [];

            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                $log.debug('$routeChangeSuccess:', current);
                currentRoute = current;
            });
            $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
                $log.debug('$locationChangeSuccess:', newUrl);
            });
            $window.addEventListener('popstate', function () {
                $log.debug('$window.popstate');
                if (routeStates.length > 2) {
                    routeStates.length = routeStates.length - 1;
                }
            });
            this.load = function (scope) {
                var whs = $window.history.state;
                if (!whs) {
                    whs = {};
                }
                if (!whs.hasOwnProperty('routeStateIndex')) {
                    $log.debug('load: creating new entry');
                    whs.routeStateIndex = routeStates.length;
                    $window.history.replaceState(whs);
                }

                var routeState = routeStates[whs.routeStateIndex] || (routeStates[whs.routeStateIndex] = new State());
                routeState.bindToScope(scope);
                $log.debug('load:', routeState);
                return routeState;
            };


  }]);