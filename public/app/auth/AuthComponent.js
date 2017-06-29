(function () {
    'use strict';

    var auth = {
        controller: AuthController,
        controllerAs: 'vm',
        templateUrl: `app/auth/auth.html`,
    };

    angular
        .module('app')
        .component('auth', auth);

    angular
        .module('app')
        .controller('AuthController', AuthController);

    AuthController.inject = [ '$scope','FIRE',' $firebaseAuth','$state'];
    function AuthController( $scope,FIRE, $firebaseAuth,$state) {
        var vm = this;


        vm.$onInit = function () {
            vm.user = {};

            vm.register = register;
            vm.login=login;
            vm.showReg=showReg;
         vm.showLogin=showLogin;
          vm.authObj=  $firebaseAuth(FIRE.auth());
      
          
        }
        function register() {
            vm.loading=true;
            vm.authObj.$createUserWithEmailAndPassword(vm.user.email, vm.user.pass)
                .then(function (firebaseUser) {
                    vm.loading=false;
                     $('#register').modal('close');
                    alert("User created with uid: " + firebaseUser.uid);
                    console.log(firebaseUser);
                    $state.go('home');
                }).catch(function (error) {
                    vm.loading=false;
                    console.log(error);
                    alert(error.message);
                });
        }

        function login(){
            vm.loading=true;
            vm.authObj.$signInWithEmailAndPassword(vm.user.email, vm.user.pass)
                .then(function (firebaseUser) {
                    vm.loading=false;
                     $('#register').modal('close');
                    alert("User logged in with uid: " + firebaseUser.uid);
                    console.log(firebaseUser);
                   
                }).catch(function (error) {
                    vm.loading=false;
                    console.log(error);
                    alert(error.message);
                });
        }
        function showReg(){
            vm.formType='register';
             $('#register').modal('open');
        }
         function showLogin(){
            vm.formType='login';
             $('#register').modal('open');
        }
    }


})();