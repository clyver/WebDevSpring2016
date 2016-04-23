/**
 * Created by christopherlyver on 2/25/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .factory("SkillService", SkillService);

    function SkillService($http) {
        var skills = [ {"_id": "000", "title": "birdwatching", "level": "novice", "mode": "mentor", "userId": 123},
                       {"_id": "010", "title": "surfing", "level": "Advanced", "mode": "mentor", "userId": 123},
                       {"_id": "020","title": "coding", "level": "Professional", "mode": "mentor", "userId": 234},
                       {"_id": "030", "title": "guitar lessons", "level": "experienced", "mode": "apprentice", "userId": 123},
                       {"_id": "040", "title": "gardening", "level": "Pro", "mode": "apprentice", "userId": 123}];


        var service = {
            createSkillForUser: createSkillForUser,
            findAllSkillsForUser: findAllSkillsForUser,
            deleteSkillById: deleteSkillById,
            updateSkillById: updateSkillById,
            findSkillById: findSkillById
        };

        return service;

        function createSkillForUser(userId, skill) {
            skill._id = (new Date()).getTime();
            skill.userId = userId;

            var new_skill = {"_id": skill._id, "title": skill.title, "level": skill.level,
                "taught": skill.taught, "sought": skill.sought,  "userId": skill.userId};

            return $http.post("/api/project/skill/", new_skill);
        }

        function findAllSkillsForUser(userId, mentorMode, apprenticeMode) {
            var user = {"userId": userId, "mentorMode": mentorMode, "apprenticeMode": apprenticeMode};
            return $http.post("/api/project/userSkills/", user)
        }

        function deleteSkillById(skillId) {
            return $http.delete("/api/project/skill/" + skillId)
        }

        function updateSkillById(skillId, newSkill, callback) {
            // Update the specified skill
            var skill_to_update = findSkillIndexById(skillId);
            var new_skill = {"title": newSkill.title, "level": newSkill.level, "mode": newSkill.mode, "userId": newSkill.userId, "_id": newSkill._id};
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