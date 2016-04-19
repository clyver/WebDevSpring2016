/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            login: login,
            logout: logout,
            register: register
        };

        return service;

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
              return $http.post("/api/assignment/logout");
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/username/" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user/username/" + username + "/password/" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function register(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }
})();