/**
 * Created by christopherlyver on 3/4/16.
 */
"use strict";
(function() {
    angular
        .module("SkillSharer")
        .factory("MeetupService", MeetupService);

    function MeetupService() {
        var meetups = [ {"_id": "000", "skill": "surfing", "date": "01-01-2017", "peer_id": 234, "userId": 123},
                        {"_id": "001", "skill": "glass blowing", "date": "04-04-2016", "peer_id": 567, "userId": 123}];

        var service = {
            createMeetupForUser: createMeetupForUser,
            findAllMeetupsForUser: findAllMeetupsForUser,
            deleteMeetupById: deleteMeetupById,
            updateMeetupById: updateMeetupById,
            findMeetupById: findMeetupById
        };

        return service;

        function createMeetupForUser(userId, meetup, callback) {
            meetup._id = (new Date()).getTime();
            meetup.userId = userId;
            var meetup_to_add = {"_id": meetup._id, "peer_id": meetup.peer_id,
                                 "skill": meetup.skill, "date": meetup.date,
                                 "userId": userId};
            meetups.push(meetup_to_add);
            callback(meetup_to_add);
        }

        function findAllMeetupsForUser(userId, callback) {
            var user_meetups = [];
            var meetups_len = meetups.length;
            for (var i = 0; i < meetups_len; i++) {
                var meetup = meetups[i];
                if (meetup.userId === userId) {
                    user_meetups.push(meetup);
                }
            }
            callback(user_meetups);
        }

        function deleteMeetupById(meetupId, callback) {
            // Delete the given meetup from our list of meetups
            var meetup_to_delete = findMeetupIndexById(meetupId);
            // Splice out the meetup_to_delete
            meetups.splice(meetup_to_delete, 1);
            callback(meetups);
        }

        function updateMeetupById(meetupId, newMeetup, callback) {
            // Update the specified meetup
            var meetup_to_update = findMeetupIndexById(meetupId);
            var new_meetup = {"skill": newMeetup.skill, "peer_id": newMeetup.peer_id,
                              "date": newMeetup.date, "userId": newMeetup.userId,
                              "_id": newMeetup._id};
            meetups[meetup_to_update] = new_meetup;
            callback(new_meetup);
        }

        function findMeetupById(id) {
            var meetups_len = meetups.length;
            var found_meetup = null;

            for (var i = 0; i < meetups_len; i++) {
                var meetup = meetups[i];
                if (meetup._id === id) {
                    found_meetup = meetup;
                    break;
                }
            }
            return found_meetup;

        }

        function findMeetupIndexById(id) {
            // A helper to find the index of the meetup with the given id
            var meetups_len = meetups.length;
            var meetup_index = -1;
            for (var i = 0; i < meetups_len; i++) {
                var meetup = meetups[i];
                if (meetup._id === id) {
                    meetup_index = i;
                    break;
                }
            }
            return meetup_index;
        }
    }
})();