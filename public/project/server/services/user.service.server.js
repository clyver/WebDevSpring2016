/**
 * Created by christopherlyver on 4/22/16.
 */

'use strict';
module.exports = function(app, model) {

    app.get("/api/project/user/username/:username/password/:password", findUserByCredentials);
    app.get("/api/project/user", findAllUsers);
    app.post("/api/project/admin/user", createUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.put("/api/project/user/:id", updateUser);


    function createUser(req, res) {
        var new_user = req.body;

        if (!new_user.roles) {
            new_user.roles = ['student'];
        }
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
        var users = model.findAllUsers()
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

        var user = model.findUserByCredentials(username, password);
        console.log("Found user:");
        console.log(user);
        res.json(user);

    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        var deletedUser = model.deleteUser(userId);
        res.json(deletedUser);
    }
};