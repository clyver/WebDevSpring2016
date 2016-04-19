/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(new_user) {
            new_user._id = (new Date()).getTime();
            // I'll assume only a student registration
            new_user.roles =  ["student"];
            UserService.register(new_user).then(
                function (response) {
                    $rootScope.currentUser = response.data;
                    $location.url('/profile');
                }
            );
        }
    }
})();