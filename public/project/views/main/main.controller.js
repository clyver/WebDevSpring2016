/**
 * Created by christopherlyver on 3/3/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.mentorMode = true;
        $rootScope.apprenticeMode = false;
        $scope.currentMode = currentMode;

        function currentMode() {
            if ($scope.mentorMode) {
                $rootScope.mode = "Taught Skills";
            } else {
                $rootScope.mode =  "Sought Skills";
            }
        }

        (function init() {
            currentMode()
        })();


    }
})();