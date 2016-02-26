/**
 * Created by christopherlyver on 2/24/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService) {
        $scope.loopy = "loopy";
        $scope.register = register;

        function call(res) {
            $scope.registered_user = res;
        }
        function register(new_user) {
            UserService.createUser(new_user, call);
        }
    }


})();