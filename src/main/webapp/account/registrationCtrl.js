/**
 * Created by dakamadafaka on 7/7/17.
 */

(function (angular) {
    angular.module('HCIApp')
        .controller('registrationCtrl', function($scope, $log, AuthenticationService, $http, $state, Alertify){

            $scope.new_user={};

            $scope.registration = function() {
                var promise = $http.post("/api/user/registration", $scope.new_user);
                promise.then(function (response) {
                    if(response.status == "200"){

                        Alertify.success('User successfully registered!');
                        $state.go('login');
                    }

                    else{
                        Alertify.error('Username already exist!');
                    }

                });
            };

        });
}(angular));