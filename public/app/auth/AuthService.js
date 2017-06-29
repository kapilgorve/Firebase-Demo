/*

(function () {
  'use strict';

  angular
    .module('app')
    .factory('AuthService', AuthService);

  AuthService.inject = ['$firebaseAuth'];
  function AuthService($firebaseAuth) {
    var service = {

      login: login,
      logOut: logOut,
      register: register
    };

    return service;

    ////////////////
    function register(user) {
    $firebaseAuth.$createUserWithEmailAndPassword(user.email,user.password)
        .then(function(firebaseUser) {
       console.log( "User created with uid: " + firebaseUser.uid);
        }).catch(function(error) {
        console.log(error);
        });
  }
    function logOut() {
    
    }
  

    function login() {
  
    }

})();*/