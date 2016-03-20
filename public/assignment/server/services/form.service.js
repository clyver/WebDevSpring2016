/**
 * Created by christopherlyver on 3/20/16.
 */
'use strict';

module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var userForms = model.findAllFormsForUser(userId);
        res.json(userForms);
    }

    function findFormById(req, res) {
        var formId = req.params._id;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params._id;
        var forms = model.deleteFormById(formId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var user = req.params.userId;
        var newForm = req.body;
        var forms = model.createFormForUser(user, newForm);
        res.json(forms);
    }

    function updateFormById(req, res) {
        var form = req.body;
        var formId = form._id;
        var forms = model.updateFormById(formId, form);
        res.json(forms);
    }
};