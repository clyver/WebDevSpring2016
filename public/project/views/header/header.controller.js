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
        function logout() {
            $rootScope.currentUser = null;
        }
    }

})();