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
        $stateProvider.state('customView', {
            parent: 'app',
            url: '/customView',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'customView/customView.html',
                    controller: 'customViewCtrl',
                    controllerAs: 'vm'
                }
            }
        });
    }


})();