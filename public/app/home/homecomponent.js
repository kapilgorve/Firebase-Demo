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
