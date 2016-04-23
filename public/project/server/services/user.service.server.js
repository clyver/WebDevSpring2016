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

        var created_user = model.createUser(new_user);
        res.json(created_user);

    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updated_user = model.updateUser(userId, user);
        res.json(updated_user);

    }

    function findAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        var user = model.findUserByCredentials(username, password);
        res.json(user);

    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        var deletedUser = model.deleteUser(userId);
        res.json(deletedUser);
    }

    function findUserById(req, res) {
        console.log("finding User");
        var userId = req.params.userId;
        var foundUser = model.findUserById(userId);
        res.json(foundUser);
    }
};