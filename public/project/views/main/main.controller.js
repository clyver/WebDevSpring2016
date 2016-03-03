/**
 * Created by christopherlyver on 3/3/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();