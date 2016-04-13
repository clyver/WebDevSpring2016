/**
 * Created by christopherlyver on 3/20/16.
 */
'use strict';
var forms = require("./form.mock.json");

module.exports = function (mongoose, fieldSchema, formSchema) {
    var Field = mongoose.model('Field', fieldSchema);
    var Form = mongoose.model('Form', formSchema);
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

    function createFormForUser(newForm) {
        return Form.create(newForm)
            .then(function(doc) {
                return doc;
            });
    }

    function findAllFormsForUser(userId) {
        return Form.find({userId: userId})
            .then(function(doc) {
                return doc;
            });
    }

    function deleteFormById(formId) {
        return Form.remove({_id: formId})
            .then(function(doc) {
                return doc;
            });
    }

    function updateFormById(formId, newForm) {
        return Form.findOneAndUpdate(
            {_id: formId},
            {$set: newForm},
            {new: true}
            )
            .then(function(doc) {
                return doc;
            });
    }

    function findFormByTitle(title) {
        return Form.find({title: title})
            .then(function(doc) {
                return doc;
            });
    }

    function findAllFieldsForForm(formId) {

        return Form.findById(formId)
            .then(function(doc) {
                return doc.fields;
            });
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
        return Form.find({_id: id})
            .then(function(doc) {
                return doc;
            });
    }
    //
    //function deleteFieldByFormId(formId, fieldId) {
    //    return Form.find({_id: formId})
    //        .then(function(doc) {
    //            console.log("Model deleting field in this form:");
    //            console.log(doc);
    //            console.log("");
    //            console.log("Doc fields:");
    //            console.log(doc[0].fields);
    //            for(var i = 0; i < doc[0].fields.length;i++){
    //                if(doc[0].fields[i]._id.toString() == fieldId){
    //                    doc[0].fields.splice(i,1);
    //                    break;
    //                }
    //            }
    //            console.log("");
    //            console.log("returning ");
    //            console.log(doc);
    //            doc.save();
    //            return doc;
    //        });
    //}

    function deleteFieldByFormId(formId, fieldId) {
        return Form
            .update(
                {_id: formId},
                // We must convert the fieldId to an ObjectId that Mongo can recognize
                {$pull: {fields: {_id: mongoose.Types.ObjectId(fieldId)}}}
            )
            .then(function(doc) {
                console.log(doc);
                return doc;
            });
    }

    function createFieldForForm(formId, field) {
        //var form = findFormById(formId);
        //form.fields.push(field);
        //return form.fields;

        return Form.findById(formId)
            .then(function(doc) {
                doc.fields.push(field);
                return doc.save();
            });
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