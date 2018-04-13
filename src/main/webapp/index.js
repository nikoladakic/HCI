/**
 * Created by daka on 3/30/18.
 */

(function (angular) {

    var app = angular.module('HCIApp',[
        'ui.router',
        'ngResource',
        'ngStorage',
        'ui.bootstrap',
        'Alertify',
        'authentication',
        'chart.js',
        'ui.select'

    ]);

    app.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    app
        .config(config)
        .run(run);
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    'navbar@': {
                        templateUrl: 'layouts/navbar/navbar.html',
                        controller: 'NavbarController',
                        controllerAs: 'vm'
                    }
                }
            });

    }
    /* AuthenticationService */
    function run($rootScope, $http, $location, $localStorage, AuthenticationService, $state) {
        // postavljanje tokena nakon refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

        // ukoliko pokušamo da odemo na stranicu za koju nemamo prava, redirektujemo se na login
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // lista javnih stanja

            var publicStates = ['login','registration'];
            var restrictedState = publicStates.indexOf(toState.name) === -1;
            if(restrictedState && !AuthenticationService.getCurrentUser()){
                $state.go('login');
            }
            console.log(toState.name);
            //provera ako je ulogovan
            if($localStorage.currentUser && toState.name === "login"){
                $state.go('home');
            }

        });

        $rootScope.logout = function () {
            AuthenticationService.logout();
        };

        $rootScope.isLoggedIn = function () {
            if (AuthenticationService.getCurrentUser()){
                return true;
            }
            else{
                return false;
            }
        };
        $rootScope.getCurrentState = function () {
            return $state.current.name;
        };

        $rootScope.getCurrentUser = function () {
            if (!AuthenticationService.getCurrentUser()){
                return undefined;
            }
            else{
                return AuthenticationService.getCurrentUser().username;
            }
        };

    }



}(angular));