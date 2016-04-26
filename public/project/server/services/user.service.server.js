/**
 * Created by christopherlyver on 4/22/16.
 */

'use strict';
module.exports = function(app, model) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    app.get("/api/project/user/username/:username/password/:password", findUserByCredentials);
    app.post("/api/project/login", passport.authenticate('local'), login);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.post("/api/project/admin/user", createUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.put("/api/project/user/:id", updateUser);

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