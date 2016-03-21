/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password).then(
                function (response) {
                    $rootScope.currentUser = response.data;
                    $location.url('/profile');
                }
            );
        }
    }
})();