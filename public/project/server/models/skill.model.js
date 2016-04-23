/**
 * Created by christopherlyver on 4/22/16.
 */
'use strict';

var skills = require('./skill.mock.json');

module.exports = function() {

    var service = {
        findAllSkills: findAllSkills,
        createSkill: createSkill,
        findAllSkillsForUser: findAllSkillsForUser,
        deleteSkillById: deleteSkillById,
        updateSkillById: updateSkillById,
        findSkillById: findSkillById
    };
    return service;

    function findAllSkills() {
        return skills;
    }

    function createSkill(new_skill) {
        skills.push(new_skill);
        return skills;
    }

    function findAllSkillsForUser(user) {
        // Unwrap our object
        var userId = user.userId;
        var mentorMode = user.mentorMode;
        var apprenticeMode = user.apprenticeMode;

        var user_skills = [];
        var skills_len = skills.length;
        for (var i = 0; i < skills_len; i++) {
            var skill = skills[i];
            if (skill.userId == userId) {
                if (mentorMode && skill.taught) {
                    user_skills.push(skill)
                }
                if (apprenticeMode && skill.sought)
                    user_skills.push(skill);
            }
        }
        return user_skills;
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
        skills[skill_to_update] = newSkill;
        return skills;
    }

    function findSkillById(id) {
        var skills_len = skills.length;
        var found_skill = null;

        for (var i = 0; i < skills_len; i++) {
            var skill = skills[i];
            if (skill._id == id) {
                found_skill = skill;
                break;
            }
        }
        return found_skill;

    }

    function findSkillIndexById(id) {
        // A helper to find the index of the skill with the given id
        var skills_len = skills.length;
        var skill_index = -1;
        for (var i = 0; i < skills_len; i++) {
            var skill = skills[i];
            if (skill._id === id) {
                skill_index = i;
                break;
            }
        }
        return skill_index;
    }
};