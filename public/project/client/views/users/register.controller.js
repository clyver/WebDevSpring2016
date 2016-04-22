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
            new_user.roles = [];
            if (new_user.mentor) {
                new_user.roles.push("mentor");
            }
            if (new_user.apprentice){
                new_user.roles.push("apprentice");
            }

            // Only register the user if they select at least one role
            if (new_user.roles.length) {
                UserService.createUser(new_user).then(
                    function (response) {
                        if (response.data) {
                            $rootScope.currentUser = new_user;
                            $location.url("/profile");
                        }
                    }
                );
            }
        }
    }
})();