/**
 * Created by christopherlyver on 3/1/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope) {
        $scope.switchMode = switchMode;

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