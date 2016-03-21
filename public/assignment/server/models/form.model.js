/**
 * Created by christopherlyver on 3/20/16.
 */
'use strict';
var forms = require('./form.mock.json');

module.exports = function() {

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle
    };

    return api;

    function createFormForUser(userId, form) {
        form._id = (new Date()).getTime();
        form.userId = userId;
        forms.push(form);
        return form;
    }

    function findAllFormsForUser(userId) {
        var user_forms = [];
        var forms_len = forms.length;
        for (var i = 0; i < forms_len; i++) {
            var form = forms[i];
            if (form.userId == userId) {
                user_forms.push(form);
            }
        }
        return user_forms;
    }

    function findFormByTitle(title) {
        var forms_len = forms.length;
        var found_form = null;

        for (var i = 0; i < forms_len; i++) {
            var form = forms[i];
            if (form.title == title) {
                found_form = form;
                break;
            }
        }
        return found_form;
    }

    function deleteFormById(formId) {
        // Delete the given form from our list of forms
        var form_to_delete = findFormIndexById(formId);
        // Splice out the form_to_delete
        forms.splice(form_to_delete, 1);
        return forms;
    }

    function updateFormById(formId, newForm) {
        // Update the specified form
        var form_to_update = findFormIndexById(formId);
        var new_form = {"title": newForm.title, "userId": newForm.userId, "_id": newForm._id};
        forms[form_to_update] = new_form;
        return new_form;
    }

    function findFormById(id) {
        var forms_len = forms.length;
        var found_form = null;

        for (var i = 0; i < forms_len; i++) {
            var form = forms[i];
            if (form._id == id) {
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
            if (form._id == id) {
                form_index = i;
                break;
            }
        }
        return form_index;
    }
};

