/**
 * Created by christopherlyver on 2/24/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        $scope.setForms = setForms;

        function setForms() {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function(res) {
                $scope.user_forms = res;
            })
        }

        (function init() {
            setForms()
        })();
    }
})();