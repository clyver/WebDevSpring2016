/**
 * Created by christopherlyver on 2/24/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(new_user) {
            UserService.createUser(new_user, function(res) {
                $scope.registered_user = res;
                $rootScope.new_user = new_user;
                $location.url("/profile");
            });
        }
    }
})();