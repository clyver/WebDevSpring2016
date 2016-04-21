"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, UserService) {

        $scope.init = init;
        $scope.register = register;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        function init() {
            UserService.findAllUsers().then(
                function(response) {
                    $scope.users = response.data;
                }
            );
        }

        init();

        function register(new_user) {
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
                    $location.url('/admin');
                }
            )

        }

        function selectUser(userIndex) {
            var user = $scope.users[userIndex];
            $scope.edit_user = {
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "roles": user.roles,
                "_id": user._id
            };
        }

        function updateUser(edited_user) {
            UserService.updateUser(edited_user._id, edited_user).then(
                function (response) {
                    init();
                    $location.url('/admin');
                }
            )
        }

    }
})();

