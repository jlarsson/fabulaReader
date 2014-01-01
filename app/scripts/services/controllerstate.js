'use strict';

angular.module('readerApp')
    .service('ControllerState', function () {
        var scopeData = [];
        
        var getScopeLevel = function (scope){
            // Find controller depth, ie distance from root
            var level = 0;
            while (scope){
                ++level;
                scope = scope.$parent;
            }
            return level;
        };
        
        this.enterController = function (scope){
            // Find controller depth, ie distance from root
            var level = getScopeLevel(scope);
            
            // assume this one is topmost, to clear out deeper ones (ie forget when navigating back in history)
            scopeData.length = level+1;
            
            // also, when scope is destroyed, assume its topmost and clear its entry
            scope.$on('$destroy', function (){
                scopeData.length = level+1;    
            });
            return scopeData[level] || (scopeData[level] = {});
        };
    });