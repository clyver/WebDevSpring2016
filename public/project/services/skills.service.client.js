/**
 * Created by christopherlyver on 2/25/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .factory("SkillService", SkillService);

    function SkillService() {
        var skills = [ {"_id": "000", "title": "birdwatching", "level": "novice", "userId": 123},
                      {"_id": "010", "title": "surfing", "level": "Advanced", "userId": 123},
                      {"_id": "020","title": "coding", "level": "Professional", "userId": 234}];

        var service = {
            createSkillForUser: createSkillForUser,
            findAllSkillsForUser: findAllSkillsForUser,
            deleteSkillById: deleteSkillById,
            updateSkillById: updateSkillById,
            findSkillById: findSkillById
        };

        return service;

        function createSkillForUser(userId, skill, callback) {
            skill._id = (new Date()).getTime();
            skill.userId = userId;
            var skill_to_add = {"_id": skill._id, "title": skill.title, "level": skill.level, "userId": skill.userId};
            skills.push(skill_to_add);
            callback(skill_to_add);
        }

        function findAllSkillsForUser(userId, callback) {
            var user_skills = [];
            var skills_len = skills.length;
            for (var i = 0; i < skills_len; i++) {
                var skill = skills[i];
                if (skill.userId === userId) {
                    user_skills.push(skill);
                }
            }
            callback(user_skills);
        }

        function deleteSkillById(skillId, callback) {
            // Delete the given skill from our list of skills
            var skill_to_delete = findSkillIndexById(skillId);
            // Splice out the skill_to_delete
            skills.splice(skill_to_delete, 1);
            callback(skills);
        }

        function updateSkillById(skillId, newSkill, callback) {
            // Update the specified skill
            var skill_to_update = findSkillIndexById(skillId);
            var new_skill = {"title": newSkill.title, "level": newSkill.level,"userId": newSkill.userId, "_id": newSkill._id};
            skills[skill_to_update] = new_skill;
            callback(new_skill);
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
    }
})();