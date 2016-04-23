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
        console.log(user_skills);
        res.json(user_skills);

    }

    function deleteSkillById(skillId) {
        // Delete the given skill from our list of skills
        var skill_to_delete = findSkillIndexById(skillId);
        // Splice out the skill_to_delete
        skills.splice(skill_to_delete, 1);
        return skills;
    }

    function updateSkillById(skillId, newSkill) {
        // Update the specified skill
        var skill_to_update = findSkillIndexById(skillId);
        var new_skill = {"title": newSkill.title, "level": newSkill.level, "mode": newSkill.mode, "userId": newSkill.userId, "_id": newSkill._id};
        skills[skill_to_update] = new_skill;
        return new_skill;
    }

    function findSkillById(id) {
        var skills_len = skills.length;
        var found_skill = null;

        for (var i = 0; i < skills_len; i++) {
            var skill = skills[i];
            if (skill._id === id) {
                found_skill = skill;
                break;
            }
        }
        return found_skill;

    }

};

