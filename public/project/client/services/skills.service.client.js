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
            findAllSkills: findAllSkills,
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

            return $http.post("/api/project/skill/", skill);
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

        function findAllSkills() {
            return $http.get("/api/project/skill");
        }

    }
})();