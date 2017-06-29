(function () {
    'use strict';

    angular
        .module('app')
        .factory('FIRE', FIRE);

    FIRE.inject = [''];
    function FIRE( ) {
             var config = {
                apiKey: "AIzaSyDzNscAcn3AQGKbXSgcy6VzVYyNvWo7SAA",
                authDomain: "fir-demo-50e41.firebaseapp.com",
                databaseURL: "https://fir-demo-50e41.firebaseio.com",
                projectId: "fir-demo-50e41",
                storageBucket: "fir-demo-50e41.appspot.com",
                messagingSenderId: "1055697007115"
            };
         firebase.initializeApp(config);    
        var service = {
            db: db,
            auth:auth
        };
        return service;
        function db(){
          
          
               var ref = firebase.database().ref();
               return ref;
        }
        function auth(){
            var auth = firebase.auth();
          
            return auth;
        }

    }
})();