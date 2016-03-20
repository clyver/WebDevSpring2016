'use strict';

var users = require('./user.mock.json');

module.exports = function() {

    var api = {createUser: createUser,
               findAllUsers: findAllUsers,
               findUserByCredentials: findUserByCredentials,
               deleteUser: deleteUser,
               updateUser: updateUser,
               findUserByUsername: findUserByUsername};
    return api;

    function createUser(user) {
        user._id = (new Date).getTime();
        users.push(user);
        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findUserByCredentials(username, password) {
        // Go through our users and return the user with the given credentials
        var users_len = users.length;
        for (var i = 0; i < users_len; i++) {
            var user = users[i];
            if (user.username == username && user.password == password) {
                return user;
                break;
            }
        }
    }

    function findUserByUsername(username) {
        // Go through our users and return the user with the given username
        var users_len = users.length;

        for (var i = 0; i < users_len; i++) {
            var user = users[i];
            if (user.username == username) {
                return user;
                break;
            }
        }
    }

    function deleteUser(userId) {
        // Delete the given user from our list of users
        var user_to_delete = findUserIndexById(userId);
        // Splice out the user_to_kick
        users.splice(user_to_delete, 1);
        return users;
    }

    function updateUser(userId, user) {
        // Update the specified user
        var user_to_update = findUserIndexById(userId);
        users[user_to_update] = user;
        return users;
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
};

