/**
 * Created by christopherlyver on 2/24/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        $scope.setForms = setForms;
        $scope.addForm = addForm;

        function setForms() {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function(res) {
                $scope.user_forms = res;
            })
        }

        function addForm(newFormTitle) {
            var new_form = {"title": newFormTitle};
            FormService.createFormForUser($rootScope.currentUser._id, new_form, function(res) {
                setForms();
            });
        }

        (function init() {
            setForms()
        })();
    }
})();