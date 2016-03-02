/**
 * Created by christopherlyver on 2/25/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [ {"_id": "000", "title": "Contacts", "userId": 123},
                      {"_id": "010", "title": "ToDo",     "userId": 123},
                      {"_id": "020", "title": "CDs",      "userId": 234}];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            form._id = (new Date()).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var user_forms = [];
            var forms_len = forms.length;
            for (var i = 0; i < forms_len; i++) {
                var form = forms[i];
                if (form.userId === userId) {
                    user_forms.push(form);
                }
            }
            callback(user_forms);
        }

        function deleteFormById(formId, callback) {
            // Delete the given form from our list of forms
            var form_to_delete = findFormIndexById(formId);
            // Splice out the form_to_delete
            forms.splice(form_to_delete, 1);
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            // Update the specified form
            var form_to_update = findFormIndexById(formId);
            var new_form = {"title": newForm.title, "userId": newForm.userId, "_id": newForm._id};
            forms[form_to_update] = new_form;
            callback(new_form);
        }

        function findFormById(id) {
            var forms_len = forms.length;
            var found_form = null;

            for (var i = 0; i < forms_len; i++) {
                var form = forms[i];
                if (form._id === id) {
                    found_form = form;
                    break;
                }
            }
            return found_form;

        }

        function findFormIndexById(id) {
            // A helper to find the index of the form with the given id
            var forms_len = forms.length;
            var form_index = -1;
            for (var i = 0; i < forms_len; i++) {
                var form = forms[i];
                if (form._id === id) {
                    form_index = i;
                    break;
                }
            }
            return form_index;
        }
    }
})();