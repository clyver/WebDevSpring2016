/**
 * Created by christopherlyver on 2/25/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .factory("SkillService", SkillService);

    function SkillService($http) {

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

        function updateSkillById(skillId, newSkill) {
            // Update the specified skill
            return $http.put("/api/project/skill/:skillId", newSkill);
        }

        function findSkillById(skillId) {
            return $http.get("/api/project/skill/" + skillId);
        }

    }
})();