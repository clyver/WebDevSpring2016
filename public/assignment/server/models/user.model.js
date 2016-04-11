'use strict';


module.exports = function(mongoose, userSchema) {

    var User = mongoose.model('User', userSchema);

    var api = {createUser: createUser,
               findAllUsers: findAllUsers,
               findUserByCredentials: findUserByCredentials,
               deleteUser: deleteUser,
               updateUser: updateUser,
               findUserByUsername: findUserByUsername,
               findUserById: findUserById};
    return api;

    function createUser(user) {
        return User.create(user)
            .then(function(doc) {
                return doc();
            })
    }

    function findAllUsers() {
        return User.find({})
            .then(function(doc) {
                return doc;
            });
    }

    function findUserByCredentials(username, password) {
        // Go through our users and return the user with the given credentials
        return User.findOne({
            username: username,
            password: password
        }).then(function(user) {
            return user;
        })
    }

    function findUserByUsername(username) {
        // Go through our users and return the user with the given username
        return User.findOne({
            username: username
        }).then(function(user) {
            return user;
        });
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
        // Update the specified user
        return User.findOneAndUpdate(
            {id: userId},
            {$set: user},
            {new: true}
        ).then(function(doc){
            return doc;
        });
    }

    function findUserById(id) {
        return User.findUserById(id)
            .then(function(user) {
                return user;
            })
    }
};

