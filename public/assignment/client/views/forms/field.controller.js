/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {
        var formId = $routeParams["formId"];
        $scope.addField = addField;
        $scope.removeField = removeField;

        function init(){
            FieldService.findFieldsForForm(formId)
                .then(function (response) {
                    console.log(response.data);
                    $scope.fields = response.data;
                });
        }

        init();

        function removeField(index) {
            var field = $scope.fields[index];
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function (response) {
                    init();
                });
        }

        function addField(type) {
            var field = {
                label: "",
                placeholder: "",
                type: ""
            };

            if (type === "TEXT") {
                field.type = type;
                field.label = "New Text Field";
                field.placeholder = "New field";
            }

            else if (type === "TEXTAREA") {
                field.type = type;
                field.label = "New Text Field";
                field.placeholder = "New field";
            }

            else if (type === "DATE") {
                field.type = type;
                field.label = "New Date field";
                field.placeholder = "New field";
            }

            else if (type === "OPTIONS") {
                field.type = type;
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

            else if (type === "CHECKBOX") {
                field.type = type;
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

            else if (type === "RADIO") {
                field.type = type;
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

            FieldService.createFieldForForm(formId, field)
                .then(function (response) {
                    console.log(response.data);
                    init();
                });

        }
    }
})();