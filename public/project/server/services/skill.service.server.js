/**
 * Created by christopherlyver on 4/22/16.
 */
'use strict';
module.exports = function(app, model) {

    var url = require('url');
    app.post("/api/project/skill/", createSkill);
    app.post("/api/project/userSkills/", findAllSkillsForUser);
    app.get("/api/project/skill/:skillId", findSkillById);
    app.delete("/api/project/skill/:id", deleteSkillById);
    app.put("/api/project/skill/:skillId", updateSkillById);


    function createSkill(req, res) {
        var skill = req.body;
        var updated_skills = model.createSkill(skill);
        res.json(updated_skills);
    }

    function findAllSkillsForUser(req, res) {
        var user = req.body;
        var user_skills = model.findAllSkillsForUser(user);
        res.json(user_skills);

    }

    function deleteSkillById(req, res) {
        var skillId = req.params.id;
        var reduced_skills =  model.deleteSkillById(skillId);
        res.json(reduced_skills);
    }

    function updateSkillById(req, res) {
        var newSkill = req.body;
        var skills = model.updateSkillById(newSkill._id, newSkill);
        res.json(skills)
    }

    function findSkillById(req, res) {
        var skillId = req.params.skillId;
        var skill = model.findSkillById(skillId);
        res.json(skill);

    }

};

