/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope) {
        $scope.logout = logout;
        $scope.switchMode = switchMode;

        function logout() {
            $rootScope.currentUser = null;
        }

        function switchMode() {
            if ($rootScope.mentorMode) {
                $rootScope.mentorMode = false;
                $rootScope.apprenticeMode = true;
                $rootScope.mode = "Sought Skills:";
            } else {
                $rootScope.mentorMode = true;
                $rootScope.apprenticeMode = false;
                $rootScope.mode = "Taught Skills:";
            }
            $rootScope.$emit('switchMode', []);
        }
    }

})();