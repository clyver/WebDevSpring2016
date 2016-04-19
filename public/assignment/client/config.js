/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'client/views/home/home.view.html'
            })
            .when('/profile', {
                templateUrl: 'client/views/users/profile.view.html',
                controller: 'ProfileController'
            })
            .when('/admin', {
                templateUrl: 'client/views/admin/admin.view.html',
                controller: 'AdminController'
            })
            .when('/forms', {
                templateUrl: 'client/views/forms/forms.view.html',
                controller: 'FormController'
            })
            .when('/form/:formId/fields', {
                templateUrl: 'client/views/forms/field.view.html',
                controller: 'FieldController'
            })
            .when('/register', {
                templateUrl: 'client/views/users/register.view.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'client/views/users/login.view.html',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/home'
            })
    }
})();