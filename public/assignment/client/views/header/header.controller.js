/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {

        $scope.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function(res){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $location.url("/login");
                    }
                );
        }

    }

})();