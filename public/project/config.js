/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
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
            .when('/meetup', {
                templateUrl: 'client/views/meetup/meetup.view.html',
                controller:  'MeetupController'
            })
            .when('/feedback', {
                templateUrl: 'client/views/feedback/feedback.view.html',

            })
            .when('/nearby', {
                templateUrl: 'client/views/nearby/nearby.view.html',
                controller: 'NearbyController'
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