/**
 * Created by christopherlyver on 2/24/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .controller("ProfileController", ProfileController);

        function ProfileController($scope, $rootScope, UserService, SkillService) {

            $scope.update = update;
            $scope.addSkill = addSkill;
            $scope.setSkills = setSkills;
            $scope.selectSkill = selectSkill;
            $scope.updateSkill = updateSkill;
            $scope.deleteSkill = deleteSkill;

            (function init() {
                setSkills();
            })();

            function setSkills() {
                SkillService.findAllSkillsForUser($rootScope.currentUser._id, function(res) {
                    $scope.user_skills = res;
                });
            }

            function update(user) {
                UserService.updateUser(user.id, user, function(res) {
                    $rootScope.currentUser = user;
                });
            }

            function addSkill(currentUser, skill) {
                SkillService.createSkillForUser(currentUser._id, skill, setSkills)
            }

            function deleteSkill(skill) {
                SkillService.deleteSkillById(skill.id, updateUserSkills)
            }

            function updateSkill(newSkill) {
                // The form with the given ID has been selected by the user
                // Update the skill the user selected, with this new form
                SkillService.updateSkillById(newSkill._id, newSkill, updateUserSkills);
            }

            function selectSkill(skillId) {
                var selected_skill = SkillService.findSkillById(skillId, updateUserSkills);
                $scope.editSkill = {"title" :selected_skill.title, "level": selected_skill.level, "userId": selected_skill.userId, "_id": selected_skill._id}
            }

            function updateUserSkills(res) {
                // A default callback function for updating this user's skills after some action
                // This is helpful because the SkillService return everybody's forms
                setSkills();
            }

        }
})();