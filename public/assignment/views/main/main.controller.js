(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location, UserService) {
        $scope.loc = $location;
        $scope.users = "dddd";

        $scope.setUsers= setUsers;

        function call(res) {
            $scope.users = res;
        }
        function setUsers() {
            UserService.findAllUsers(call);
        }
    }


})();