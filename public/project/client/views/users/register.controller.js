/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(new_user) {
            new_user._id = (new Date()).getTime();

            UserService.createUser(new_user).then(
                function (response) {
                    if (response.data) {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                }
            );
        }
    }
})();