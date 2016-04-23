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
                SkillService.findAllSkillsForUser($rootScope.currentUser._id, $scope.mentorMode, $scope.apprenticeMode).then(
                    function(res) {
                    $rootScope.user_skills = res.data;
                }
                );
            }

            $rootScope.$on('switchMode', setSkills);

            function update(user) {
                UserService.updateUser(user._id, user).then(
                    function(response) {
                        $rootScope.currentUser = response.data;
                    }
                );
            }

            function addSkill(skill) {

                if (skill && skill.title && skill.level) {
                    skill.taught = false;
                    skill.sought = false;

                    if ($scope.mentorMode) {
                        skill.taught = true;
                    }
                    if ($scope.apprenticeMode) {
                        skill.sought = true;
                    }

                    SkillService.createSkillForUser($scope.currentUser._id, skill).then(
                        function (response) {
                            updateUserSkills(response);
                        }
                    )
                }
            }

            function deleteSkill(skillId) {
                SkillService.deleteSkillById(skillId).then(
                    function (response) {
                        updateUserSkills(response);
                    }
                )
            }

            function updateSkill(newSkill) {
                if (newSkill && newSkill.title && newSkill.level) {
                    SkillService.updateSkillById(newSkill._id, newSkill).then(
                        function (response) {
                            updateUserSkills(response);
                        }
                    )
                }
            }

            function selectSkill(skillId) {
                SkillService.findSkillById(skillId).then(
                    function (response) {
                        $scope.editSkill = response.data;
                    }
                )
            }

            function updateUserSkills(res) {
                // A default callback function for updating this user's skills after some action
                // This is helpful because the SkillService return everybody's forms
                setSkills();
            }

        }
})();