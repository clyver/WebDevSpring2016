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
            // I'll assume only a student registration
            new_user.roles =  ["student"];
            UserService.createUser(new_user, function(res) {
                $rootScope.currentUser = new_user;
                $location.url("/profile");
            });
        }
    }
})();