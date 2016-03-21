/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

        function ProfileController($scope, $rootScope, UserService) {

            $scope.update = update;

            function update(user) {
                UserService.updateUser(user._id, user).then(
                    function(response) {
                        $rootScope.currentUser = response.data;
                    }
                );
            }
        }
})();