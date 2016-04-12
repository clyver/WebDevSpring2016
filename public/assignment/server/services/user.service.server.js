/**
 * Created by christopherlyver on 3/20/16.
 */
'use strict';
module.exports = function(app, model) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/username/:username", findUserByUsername);
    app.get("/api/assignment/user/username/:username/password/:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var new_user = req.body;
        model.createUser(new_user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.json({'error': err});
            });
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        //var updated_user = model.updateUser(userId, user);
        //res.json(updated_user);

        model.updateUser(userId, user)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    console.log("Service err:");
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        var allUsers = model.findAllUsers();
        res.json(allUsers);
    }

    function findUserById(req, res) {
        var userId = req.params._id;
        var found_user = model.findUserById(userId);
        res.json(found_user)
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var foundUser = model.findUserByUsername(username);
        res.json(foundUser);
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        model
            .findUserByCredentials(username, password)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params._id;
        var deletedUser = model.deleteUser(userId);
        res.json(deletedUser);
    }
};