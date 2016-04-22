/**
 * Created by christopherlyver on 3/4/16.
 */
(function() {
    angular
        .module("SkillSharer")
        .controller("NearbyController", NearbyController);

    function NearbyController($scope, UserService) {

        $scope.getNearbyUsers = getNearbyUsers;

        function getNearbyUsers() {
            UserService.findAllUsers().then(
                function (response) {
                    if (response.data) {
                        $scope.nearbyUsers = response.data;
                    }
                }
            )
        }

        (function init() {
            getNearbyUsers();
        })();

    }
})();