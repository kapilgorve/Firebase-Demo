
(function () {
    'use strict';

    angular.module('app', ['ui.router', 'firebase'

    ]);



})();

(function () {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/auth');

            $stateProvider

                // HOME STATE ========================================
                .state('home', {
                    url: '/home',
                    component: 'home',
                    resolve: {
                        authError: function (FIRE, $firebaseAuth, $state) {
                            var authObj = $firebaseAuth(FIRE.auth());
                            var user = authObj.$getAuth();
                            if (!user) {
                                $state.go('auth');
                            }
                            else return true;
                        }
                    }
                })
                .state('auth', {
                    url: '/auth',
                    component: 'auth'
                })
        }]);

})();
