
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
(function () {
    'use strict';

    var home = {
        controller: HomeController,
        controllerAs: 'vm',
        templateUrl: `app/home/home.html`,
    };

    angular
        .module('app')
        .component('home', home);


    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.inject = ['FIRE', '$firebaseObject', '$firebaseArray', '$firebaseAuth'];
    function HomeController(FIRE, $firebaseObject, $firebaseArray, $firebaseAuth) {
        var vm = this;


        vm.$onInit = function () {
            vm.loading = true;
            vm.sweets;
            vm.sweet = {};
            vm.sweet.name = '';
            vm.sweet.url = '';
            vm.sweet.desc = '';
            vm.sweet.by = '';
            vm.sweets = $firebaseArray(FIRE.db().child('sweets'));
            vm.authObj = $firebaseAuth(FIRE.auth());
            vm.user = vm.authObj.$getAuth();

            vm.addSweet = addSweet;
            vm.showAdd = showAdd;
            vm.removeSweet = removeSweet;


            vm.sweets.$loaded()
                .then(function () {
                    vm.loading = false;
                    console.log(vm.sweets);

                })
                .catch(function (err) {
                    vm.loading = false;
                    console.error(err);
                });



        }

        function addSweet() {
            vm.loading = true;
            vm.authObj = $firebaseAuth(FIRE.auth());
            vm.user = vm.authObj.$getAuth();
            vm.sweet.by = vm.user.uid;
            vm.sweets.$add(vm.sweet).then(function (ref) {
                var id = ref.key;
                alert("Sweet added with id " + id);
                $('#add').modal('close');
                vm.loading = false;
                vm.sweet.name = '';
                vm.sweet.url = '';
                vm.sweet.desc = '';
                vm.sweet.by = '';

            })
                .catch(function (err) {
                    console.log(err);
                    $('#add').modal('close');
                    vm.loading = false;
                });
        }

        function removeSweet(id) {
            var item = vm.sweets[id]
            vm.sweets.$remove(item).then(function (ref) {
                var id = ref.key;
                alert("Sweet removed with id " + id);
                vm.loading = false;
            })
                .catch(function (err) {
                    console.log(err);
                    vm.loading = false;
                });
        }

        function showAdd() {
            $('#add').modal('open');
        }
    }


})();
