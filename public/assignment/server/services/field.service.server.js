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
        var fields = model.findAllFieldsForForm(formId);
        res.json(fields);
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
        var fields = model.deleteFieldByFormId(formId, fieldId);
        res.json(fields);
    }

    function createFieldForForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        console.log(req.params);
        console.log("FormId: " + formId);
        console.log("Field: " + field);
        field._id = (new Date).getTime();
        var fields = model.createFieldForForm(formId, field);
        res.json(fields);
    }

    function updateFieldByFormId(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        var fields = model.updateFieldByFormId(formId, field);
        res.json(fields);
    }
}