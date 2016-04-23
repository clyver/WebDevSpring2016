/**
 * Created by christopherlyver on 4/22/16.
 */
'use strict';

var users = require('./user.mock.json');

module.exports = function(mongoose, userSchema) {

    var User = mongoose.model('projectUser', userSchema);

    var api = {
        findUserById: findUserById,
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser
    };
    return api;

    function findUserById(userId) {
        return User.findById(userId)
            .then(function(user) {
                    return user;
                },
                function(err) {
                    console.log(err);
                });
    }

    function createUser(user) {
        // TODO: Remove id generation in the client
        if (user._id) {
            delete user._id;
        }

        return User.create(user)
            .then(function(new_user) {
                    return new_user;
                },
                function(err) {
                    console.log(err);
                });
    }

    function findAllUsers() {
        return User.find({})
            .then(function(doc) {
                return doc;
            });
    }

    function findUserByCredentials(username, password) {
        return User.findOne({
            username: username,
            password: password
        }).then(function(user) {
            return user;
        })
    }


    function deleteUser(userId) {
        // Delete the given user from our list of users
        return User.findById(userId)
            .then(function(user) {
                user.remove();
                return findAllUsers();
            });
    }

    function updateUser(userId, user) {
        return User.findByIdAndUpdate(userId, user, {new: true})
            .then(function(doc){
                return doc;
            });
    }
};
