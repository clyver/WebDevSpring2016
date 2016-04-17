/**
 * Created by christopherlyver on 3/20/16.
 */
'use strict';
module.exports = function(app, model) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/username/:username", findUserByUsername);
    app.get("/api/assignment/user/username/:username/password/:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/user", register);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        model
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        console.log(req.body);
        var newUser = req.body;
        if (newUser.roles.length === 0) {
            newUser.roles = ['student'];
        }

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    if (user.length) {
                        res.json(null);
                    }
                    else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if (user) {
                        req.login(user, function(err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

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