/**
 * Created by daka on 3/30/18.
 */

(function() {
    'use strict';
    angular
        .module('HCIApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'home/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'vm'
                }
            }
        });
    }


})();