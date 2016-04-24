/**
 * Created by christopherlyver on 4/22/16.
 */
'use strict';
module.exports = function(app, model) {

    var url = require('url');
    app.get("/api/project/skill", findAllSkills);
    app.post("/api/project/skill/", createSkill);
    app.post("/api/project/userSkills/", findAllSkillsForUser);
    app.get("/api/project/skill/:skillId", findSkillById);
    app.delete("/api/project/skill/:id", deleteSkillById);
    app.put("/api/project/skill/:skillId", updateSkillById);

    function findAllSkills(req, res) {
        model.findAllSkills()
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createSkill(req, res) {
        var skill = req.body;

        delete skill._id;
        console.log("New Skill");
        console.log(skill);
        model.createSkill(skill)
            .then(function (newSkill) {
                res.json(newSkill);
            }, function (err) {
                res.json({'error': err});
            });
    }

    function findAllSkillsForUser(req, res) {
        var user = req.body;
        model.findAllSkillsForUser(user)
            .then(function (newSkill) {
                res.json(newSkill);
            }, function (err) {
                res.json({'error': err});
            });
    }

    function deleteSkillById(req, res) {
        var skillId = req.params.id;
        model.deleteSkillById(skillId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.json(err)
            }
        );
    }

    function updateSkillById(req, res) {
        var newSkill = req.body;
        model.updateSkillById(newSkill._id, newSkill).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.json(err)
            }
        );
    }

    function findSkillById(req, res) {
        var skillId = req.params.skillId;
        model.findSkillById(skillId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.json(err)
            }
        );

    }

};

