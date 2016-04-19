"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, UserService) {

        $scope.init = init;
        $scope.register = register;

        function init() {
            UserService.findAllUsers().then(
                function(response) {
                    $rootScope.users = response.data;
                }
            );
        }

        function register(new_user) {
            new_user._id = (new Date()).getTime();
            // I'll assume only a student registration
            new_user.roles =  new_user.roles.split(", ");
            UserService.createUser(new_user).then(
                function (response) {
                    init();
                    $location.url('/admin');
                }
            );
        }

        init();

    }
})();

