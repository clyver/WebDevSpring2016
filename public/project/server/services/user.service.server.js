/**
 * Created by christopherlyver on 4/22/16.
 */

'use strict';
module.exports = function(app, model) {

    app.get("/api/project/user/username/:username/password/:password", findUserByCredentials);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.post("/api/project/admin/user", createUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.put("/api/project/user/:id", updateUser);


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
        var thisUser = req.body;

        model.updateUser(userId, thisUser)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllUsers(req, res) {
        model.findAllUsers()
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        model.findUserByCredentials(username, password)
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
        var userId = req.params.id;
        model.deleteUser(userId).then(
            function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findUserById(req, res) {
        var userId = req.params._id;
        model.findUserById(userId).then(
            function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
        res.json(found_user)
    }
};