/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {
        var uid = $routeParams["userId"];
        var fid = $routeParams["formId"];
        $scope.addField = addField;
        $scope.removeField = removeField;

        function init(){
            FieldService.findFieldsForForm(fid)
                .then(function (response) {
                    console.log(response.data);
                    $scope.fields = response.data;
                });
        }

        init();


        function removeField(index) {
            var field = $scope.fields[index];
            FieldService.deleteFieldFromForm(fid, field._id)
                .then(function (response) {
                    $scope.fields = response.data;
                });
        }

        function addField(fieldType) {
            var field = {
                label: "",
                placeholder: "",
                fieldType: ""
            };

            if (fieldType === "TEXT") {
                field.type = fieldType;
                field.label = "New Text Field";
                field.placeholder = "New field";
            }

            else if (fieldType === "TEXTAREA") {
                field.type = fieldType;
                field.label = "New Text Field";
                field.placeholder = "New field";
            }

            else if (fieldType === "DATE") {
                field.type = fieldType;
                field.label = "New Date field";
                field.placeholder = "New field";
            }

            else if (fieldType === "OPTIONS") {
                field.type = fieldType;
                field.label = "New Dropdown";
                field.options = [{
                    "label": "Option D",
                    "value": "OPTION_D"
                }, {
                    "label": "Option E",
                    "value": "OPTION_E"
                }, {
                    "label": "Option F",
                    "value": "OPTION_F"
                }]
            }

            else if (fieldType === "CHECKBOX") {
                field.type = fieldType;
                field.label = "New Checkboxes";
                field.options = [{
                    "label": "Option A",
                    "value": "OPTION_A"
                }, {
                    "label": "Option B",
                    "value": "OPTION_B"
                }, {
                    "label": "Option C",
                    "value": "OPTION_C"
                }]
            }

            else if (fieldType === "RADIO") {
                field.type = fieldType;
                field.label = "New Radio buttons";
                field.options = [{
                    "label": "Option X",
                    "value": "OPTION_X"
                }, {
                    "label": "Option Y",
                    "value": "OPTION_Y"
                }, {
                    "label": "Option Z",
                    "value": "OPTION_Z"
                }]
            }

            //   console.log(field);
            FieldService.createFieldForForm(fid, field)
                .then(function (response) {
                    console.log(response.data);
                    $scope.fields = response.data;
                });

        }
    }
})();