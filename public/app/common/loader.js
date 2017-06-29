(function() {
    'use strict';

    angular
        .module('app')
        .directive('loader', loader);
    function loader() {

        var directive = {
            restrict: 'AE',
            templateUrl:'app/common/loader.html'
        };
        return directive;   
    }
})();