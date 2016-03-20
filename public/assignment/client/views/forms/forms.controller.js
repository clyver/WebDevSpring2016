/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        $scope.setForms = setForms;
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;

        function setForms() {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function(res) {
                $scope.user_forms = res;
            });
        }

        function addForm(newForm) {
            var new_form = {"title": newForm.title};
            FormService.createFormForUser($rootScope.currentUser._id, new_form, function(res) {
                setForms();
                $scope.editForm = {"title": res.title, "_id": res._id, "userId": res.userId};
            });

        }

        function deleteForm(formId, formIndex) {
            FormService.deleteFormById(formId, updateUserForms);
        }

        function updateForm(newForm) {
            // The form with the given ID has been selected by the user
            // Update the form the user selected, with this new form
            FormService.updateFormById(newForm._id, newForm, updateUserForms);
        }

        function selectForm(formId, formIndex) {
            var selected_form = FormService.findFormById(formId);
            $scope.editForm = {"title" :selected_form.title, "userId": selected_form.userId, "_id": selected_form._id}
        }

        (function init() {
            setForms();
        })();

        function updateUserForms(res) {
            // A default callback function for updating this user's forms after some action
            // This is helpful because the FormService return everybody's forms
            setForms();
        }
    }
})();