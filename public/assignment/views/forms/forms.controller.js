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
        $scope.deleteForm = deleteForm;

        function setForms() {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function(res) {
                $scope.user_forms = res;
            })
        }

        function addForm(newFormTitle) {
            var new_form = {"title": newFormTitle};
            FormService.createFormForUser($rootScope.currentUser._id, new_form, updateUserForms);
        }

        function deleteForm(formId) {
            FormService.deleteFormById(formId, updateUserForms);
        }

        (function init() {
            setForms()
        })();

        function updateUserForms(res) {
            // A default callback function for updating this user's forms after some action
            // This is helpful because the FormService return everybody's forms
            setForms();
        }
    }
})();