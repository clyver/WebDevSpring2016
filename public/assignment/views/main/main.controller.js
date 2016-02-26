(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location, UserService) {
        $scope.loc = $location;
        $scope.getUsers = getUsers;

        function call(res) {
            $scope.users = res;
        }
        function getUsers() {
            UserService.findAllUsers(call);
        }
    }


})();