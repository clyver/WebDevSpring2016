/**
 * Created by christopherlyver on 4/22/16.
 */
'use strict';

module.exports = function(mongoose, skillSchema) {

    var Skill = mongoose.model('projectSkill', skillSchema);

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
        return Skill.find({})
            .then(function(doc) {
                return doc;
            });
    }

    function createSkill(new_skill) {
        return Skill.create(new_skill)
            .then(function(new_skill) {
                    return new_skill;
                },
                function(err) {
                    console.log(err);
                });
    }

    function findAllSkillsForUser(user) {
        // Unwrap our object
        var userId = user.userId;
        var mentorMode = user.mentorMode;
        var apprenticeMode = user.apprenticeMode;

        console.log("In model");
        console.log(user);
        if (mentorMode) {
            return Skill.find({
                userId: userId,
                taught: mentorMode
            }).then(function(skills) {
                return skills;
            })
        }
        if (apprenticeMode) {
            return Skill.find({
                userId: userId,
                sought: apprenticeMode
            }).then(function(skills) {
                return skills;
            })
        }
    }

    function deleteSkillById(skillId) {

        return Skill.findById(skillId)
            .then(function(user) {
                user.remove();
                return user;
            });
    }

    function updateSkillById(skillId, newSkill) {

        return Skill.findByIdAndUpdate(skillId, newSkill, {new: true})
            .then(function(doc){
                return doc;
            });
    }

    function findSkillById(id) {
        return Skill.findById(id).then(
            function(doc){
                return doc;
            }
        );
    }
};