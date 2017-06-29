(function () {
    'use strict';

    var appHeader = {
        controller: 'HeaderController',
        controllerAs: 'vm',
        templateUrl: `app/header/header.html`
    };

    angular
        .module('app')
        .component('appHeader', appHeader);


    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['FIRE', '$firebaseAuth', '$state'];
    function HeaderController(FIRE, $firebaseAuth, $state) {
        var vm = this;


        vm.$onInit = function () {
            vm.authObj = $firebaseAuth(FIRE.auth());
            vm.user = vm.authObj.$getAuth();
            vm.authObj.$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                    vm.user = firebaseUser;
                    $state.go('home');
                } else {
                     vm.user=null;
              
                    console.log("Signed out");
                    $state.go('auth');
                }
            });
        }
    }
})();