/**
 * Created by christopherlyver on 2/24/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

        function ProfileController($scope, $rootScope, UserService) {

            $scope.update = update;

            function update(user) {
                UserService.updateUser(user.id, user, function(res) {
                    $rootScope.currentUser = user;
                });
            }
        }
})();