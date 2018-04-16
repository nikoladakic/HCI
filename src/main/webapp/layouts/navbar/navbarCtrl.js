/**
 * Created by daka on 3/30/18.
 */

(function() {
    'use strict';

    angular
        .module('HCIApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', '$scope'];

    function NavbarController ($state, $scope) {
        var vm = this;

        vm.login = login;
        vm.registration = registration;
        vm.customView = customView;
        vm.info = info;
        vm.home = home;

        // Must use a wrapper object, otherwise "activeItem" won't work
        $scope.states = {};
        $scope.states.activeItem = 'item1';

        $scope.item1 = "item1";
        $scope.item2 = "item2";
        $scope.item2 = "item3";


        function login() {
            $state.go('login');
        }

        function registration() {
            $state.go('registration');
        }

        function home() {
            $state.go('home');
        }


        function customView() {
            $state.go('customView');
        }

        function info() {
            $state.go('info');
        }


    }
})();
