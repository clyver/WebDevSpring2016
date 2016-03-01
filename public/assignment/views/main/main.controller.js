(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
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