'use strict';

angular.module('readerApp')
    .service('RouteState', ['$rootScope', '$window', '$timeout', '$log', '$location', 'RouteStateHolder',
        function ($rootScope, $window, $timeout, $log, $location, rsh) {
            function State() {
                var scrollTop = 0;

                this.bindToScope = function (scope) {
                    scope.$on('$destroy', function () {
                        scrollTop = $window.pageYOffset;
                        $log.debug('#scrollTop save: ' + scrollTop);
                    });
                };
                this.restoreScroll = function () {
                    $timeout(function () {
                        $window.scrollTo(0, scrollTop);
                        $log.debug('#scrollto: ' + scrollTop);
                    });
                };
            };
            this.load = function (scope) {
                var index = parseInt($location.search().statekey);
                var state = rsh.getTopLevelState(index, function () {
                    return new State();
                });
                state.bindToScope(scope);
                return state;
            };
            /*
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
                if ($window.history.state) {
                    $log.debug("##OK window.history");
                } else {
                    $log.debug("##UNSUPPORTED window.history");
                }

                var routeState = routeStates[whs.routeStateIndex] || (routeStates[whs.routeStateIndex] = new State());
                routeState.bindToScope(scope);
                $log.debug('load:', routeState);
                return routeState;
            };
*/

      }]);

angular.module('readerApp')
    .service('RouteStateHolder', function () {
        var routeStates = [];
        this.getNextState = function () {
            return routeStates.length;
        };
        this.getTopLevelState = function (index, stateFactory) {
            routeStates.length = index + 1;
            return routeStates[index] || (routeStates[index] = stateFactory());
        };
    });
angular.module('readerApp')
    .directive('state', ['RouteStateHolder',

        function (rsh) {
            return {
                restrict: 'EA',
                link: function ($scope, element, attrs) {
                    element.bind('click', function () {
                        var href = element.attr('href');
                        if (href) {
                            var parts = href.split('?');
                            if (parts[1]) {
                                href = parts[0] + '?' + parts[1].replace(/statekey=\d+/, 'statekey=' + rsh.getNextState());
                            } else {
                                href = parts[0] + '?statekey=' + rsh.getNextState();
                            }
                            element.attr('href', href);
                        }
                    })
                }
            }
        }]);