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
                templateUrl: 'views/home/home.view.html'
            })
            .when('/profile', {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileController'
            })
            .when('/meetups', {
                templateUrl: 'views/users/meetups.view.html',
                controller:  'MeetupsController'
            })
            .when('/feedback', {
                templateUrl: 'views/users/feedback.view.html',
                controller: 'FeedbackController'
            })
            .when('/nearby', {
                templateUrl: 'views/users/nearby.view.html',
                controller: 'NearbyController'
            })
            .when('/register', {
                templateUrl: 'views/users/register.view.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'views/users/login.view.html',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/home'
            })
    }
})();