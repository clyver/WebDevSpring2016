/**
 * Created by christopherlyver on 3/20/16.
 */
'use strict';
var forms = require("./form.mock.json");

module.exports = function () {

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFormId: findFieldByFormId,
        deleteFieldByFormId: deleteFieldByFormId,
        createFieldForForm: createFieldForForm,
        updateFieldByFormId: updateFieldByFormId
    };

    return api;

    function createFormForUser(userId, newForm) {
        newForm.fields = [];
        newForm._id = (new Date).getTime();
        newForm.userId = userId;
        forms.push(newForm);
        return newForm;
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        userId = userId;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId == userId) {
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function deleteFormById(formId) {
        var userId = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                userId = forms[i].userId;
                forms.splice(i, 1);
                break;
            }
        }
        return findAllFormsForUser(formId);
    }

    function updateFormById(formId, newForm) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i]._id = newForm._id;
                forms[i].title = newForm.title;
                forms[i].userId = newForm.userId;
                break;
            }
        }
        return findAllFormsForUser(newForm.userId);
    }

    function findFormByTitle(title) {
        var form = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title) {
                form = forms[i];
            }
        }
        return form;
    }

    function findAllFieldsForForm(formId) {
        var form = findFormById(formId);
        return form.fields;
    }

    function findFieldByFormId(formId, fieldId) {
        var form = findFormById(formId);
        var field = null;
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i]._id == fieldId) {
                field = form.fields[i];
                break;
            }
        }
        return field;
    }

    function findFormById(id) {
        var form = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id) {
                form = forms[i];
                break;
            }
        }
        return form;
    }

    function deleteFieldByFormId(formId, fieldId) {
        var form = findFormById(formId);
        var field = null;
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i]._id == fieldId) {
                field = form.fields[i];
                form.fields.splice(i, 1);
                break;
            }
        }
        return form.fields;
    }

    function createFieldForForm(formId, field) {
        var form = findFormById(formId);
        form.fields.push(field);
        return form.fields;
    }

    function updateFieldByFormId(formId, field) {
        var form = findFormById(formId);
        for (var i = 0; i < form.fields.length; i++) {
            if(form.field[i]._id == field._id){
                form.field[i].label = field.label;
                form.field[i].type = field.type;
                form.field[i].placeholder = field.placeholder;
                form.field[i].options = field.options;
            }
        }
        return form.fields;
    }
};