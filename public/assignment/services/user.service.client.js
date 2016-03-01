/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [ {	"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice", "roles": ["student"]},
                      {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "roles": ["admin"]},
                      {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie","password":"charlie", "roles": ["faculty"]},
                      {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
                      {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "roles": ["student"]}];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback) {
            // Go through our users and return the user with the given credentials
            var users_len = users.length;
            for (var i = 0; i < users_len; i++) {
                var user = users[i];
                if (user.username == username && user.password == password) {
                    callback(user);
                    break;
                }
            }
        }

        function findAllUsers(callback) {
            return callback(users);
        }

        function createUser(user, callback) {
            users.push(user);
            callback(users);
        }

        function deleteUser(userId, callback) {
            // Delete the given user from our list of users
            var user_to_delete = findUserIndexById(userId);
            // Splice out the user_to_kick
            users.splice(user_to_delete, 1);
            callback(users);

        }

        function updateUser(userId, user, callback) {
            // Update the specified user
            var user_to_update = findUserIndexById(userId);
            users[user_to_update] = user;
            callback(users);
        }

        function findUserIndexById(id) {
            // A helper to find the index of the user with the given id
            var users_len = users.length;
            var user_index = -1;
            for (var i = 0; i < users_len; i++) {
                var user = users[i];
                if (user._id === id) {
                    user_index = i;
                    break;
                }
            }
            return user_index;
        }
    }
})();