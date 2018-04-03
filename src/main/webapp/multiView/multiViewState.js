(function() {
    'use strict';
    angular
        .module('HCIApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/multiView',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'multiView/multiView.html',
                    controller: 'multiViewCtrl'
                }
            }
        });
    }


})();