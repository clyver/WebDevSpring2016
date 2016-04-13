/**
 * Created by christopherlyver on 3/20/16.
 */

'use strict';
module.exports = function (app, model) {
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormId);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);


    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;

        model.findAllFieldsForForm(formId)
            .then(function(fields) {
                res.json(fields);
            });
    }

    function findFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.findFieldByFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteFieldByFormId(formId, fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        //var fields = model.createFieldForForm(formId, field);
        //res.json(fields);

        var newField = {
            'label': req.param('label'),
            'type': req.param('type'),
            'placeholder': req.param('placeholder'),
            'options': req.param('options')
        };

        model.createFieldForForm(formId, newField)
            .then(function(field) {
                res.json(field);
            });
    }

    function updateFieldByFormId(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        var fields = model.updateFieldByFormId(formId, field);
        res.json(fields);
    }
};