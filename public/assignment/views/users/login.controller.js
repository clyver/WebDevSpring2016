/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password, function(res) {
                if (res) {
                    $rootScope.currentUser = res;
                    $location.url('/profile');
                }
            });
        }
    }
})();