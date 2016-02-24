/**
 * Created by christopherlyver on 2/24/16.
 */
var app = angular.module("FormBuilderApp", ["ngRoute"]);

app.controller("MainController", MainController);

function MainController($scope, $location){
    $scope.loc = $location
}