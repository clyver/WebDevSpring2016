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

        model.findAllFormsForUser(userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function findFormById(req, res) {
        var formId = req.params.formId;

        model.findFormById(formId)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;

        model.deleteFormById(formId)
            .then(function (response) {
                res.json(response);
            });
    }

    function createFormForUser(req, res) {
        var user = req.params.userId;
        var newForm = req.body;
        newForm.userId = user;

        //var form = model.createFormForUser(newForm);
        //res.json(form);

        model.createFormForUser(newForm)
            .then(function (response) {
                res.json(response);
            });
    }

    function updateFormById(req, res) {
        var form = req.body;
        var formId = form._id;
        var forms = model.updateFormById(formId, form);
        res.json(forms);

        model.updateFormById(formId, form)
            .then(function (response) {
                res.json(response);
            });
    }
};