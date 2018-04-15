/**
 * Created by daka on 3/30/18.
 */

(function() {
    'use strict';

    angular
        .module('HCIApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state'];

    function NavbarController ($state) {

        var vm = this;

        vm.login = login;
        vm.registration = registration;

        vm.customView = customView;
        vm.info = info;


        function login() {
            $state.go('login');
        }

        function registration() {
            $state.go('registration');
        }

        function customView() {
            $state.go('customView');
        }

        function info() {
            $state.go('info');
        }


    }
})();
