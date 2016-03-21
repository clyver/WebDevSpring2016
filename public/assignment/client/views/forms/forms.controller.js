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
            FormService.findAllFormsForUser($rootScope.currentUser._id).then(
                function(response) {
                    $scope.user_forms = response.data;
                }
            );
        }

        function addForm(newForm) {
            var new_form = {"title": newForm.title};
            FormService.createFormForUser($rootScope.currentUser._id, new_form).then(
                function (response) {
                    var new_form = response.data;
                    setForms();
                    $scope.editForm = {"title": new_form.title, "_id": new_form._id, "userId": new_form.userId};
                }
            );

        }

        function deleteForm(formId, formIndex) {
            FormService.deleteFormById(formId, updateUserForms).then(
                function (response){
                    setForms();
                }
            );
        }

        function updateForm(newForm) {
            // The form with the given ID has been selected by the user
            // Update the form the user selected, with this new form
            FormService.updateFormById(newForm._id, newForm).then(
                function (response) {
                    setForms();
                }
            );
        }

        function selectForm(formId, formIndex) {
            FormService.findFormById(formId).then(
                function (response) {
                    var form = response.data;
                    $scope.editForm = {
                        "title": form.title,
                        "userId": form.userId,
                        "_id": form._id
                    }
                }
            )
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