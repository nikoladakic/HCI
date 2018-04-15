/**
 * Created by daka on 4/16/18.
 */


(function() {
    'use strict';
    angular
        .module('HCIApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('info', {
            parent: 'app',
            url: '/info',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'info/info.html',
                    controller: 'infoCtrl',
                    controllerAs: 'vm'
                }
            }
        });
    }


})();