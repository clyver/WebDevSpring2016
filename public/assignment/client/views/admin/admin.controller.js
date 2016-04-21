"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, UserService) {

        $scope.init = init;
        $scope.register = register;
        $scope.deleteUser = deleteUser;

        function init() {
            UserService.findAllUsers().then(
                function(response) {
                    $scope.users = response.data;
                }
            );
        }

        init();

        function register(new_user) {
            new_user._id = (new Date()).getTime();
            // I'll assume only a student registration
            if (new_user.roles) {
                new_user.roles = new_user.roles.split(", ");
            }
            UserService.createUser(new_user).then(
                function (response) {
                    init();
                    $location.url('/admin');
                }
            );
        }

        function deleteUser(userIndex) {
            var user = $scope.users[userIndex];
            UserService.deleteUser(user._id).then(
                function (response) {
                    init();
                    $location.url('admin');
                }
            )

        }

    }
})();

