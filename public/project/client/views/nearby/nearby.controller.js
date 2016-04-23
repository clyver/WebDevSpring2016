/**
 * Created by christopherlyver on 3/4/16.
 */
(function() {
    angular
        .module("SkillSharer")
        .controller("NearbyController", NearbyController);

    function NearbyController($scope, SkillService) {

        function getNearbySkills() {
            SkillService.findAllSkills().then(
                function (response) {
                    if (response.data) {
                        $scope.nearbySkills = response.data;
                    }
                }
            );
        }

        (function init() {
            getNearbySkills();
        })();

    }
})();