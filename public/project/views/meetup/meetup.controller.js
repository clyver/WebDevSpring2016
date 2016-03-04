/**
 * Created by christopherlyver on 3/4/16.
 */
(function() {
    angular
        .module("SkillSharer")
        .controller("MeetupController", MeetupController);

    function MeetupController($scope, $rootScope, MeetupService) {

        $scope.updateMeetup = updateMeetup;
        $scope.addMeetup = addMeetup;
        $scope.setMeetups = setMeetups;
        $scope.selectMeetup = selectMeetup;
        $scope.updateMeetup = updateMeetup;
        $scope.deleteMeetup= deleteMeetup;

        (function init() {
            setMeetups();
        })();

        function setMeetups() {
            MeetupService.findAllMeetupsForUser($rootScope.currentUser._id, function(res) {
                $scope.user_meetups = res;
            });
        }

        function addMeetup(currentUser, meetup) {
            if (meetup.peer_id && meetup.date && meetup.skill) {
                MeetupService.createMeetupForUser(currentUser._id, meetup, updateUserMeetups);
            }
        }

        function deleteMeetup(meetup) {
            MeetupService.deleteMeetupById(meetup._id, updateUserMeetups)
        }

        function updateMeetup(newMeetup) {
            // The form with the given ID has been selected by the user
            // Update the meetup the user selected, with this new form
            if (newMeetup.peer_id && newMeetup.date && newMeetup.skill) {
                MeetupService.updateMeetupById(newMeetup._id, newMeetup, updateUserMeetups);
            }
        }

        function selectMeetup(meetupId) {
            var selected_meetup = MeetupService.findMeetupById(meetupId, updateUserMeetups);
            $scope.editMeetup = {"skill": selected_meetup.skill,"peer_id" :selected_meetup.peer_id,
                                 "date": selected_meetup.date, "userId": selected_meetup.userId,
                                  "_id": selected_meetup._id}
        }

        function updateUserMeetups(res) {
            // A default callback function for updating this user's meetup after some action
            // This is helpful because the MeetupService return everybody's forms
            setMeetups();
        }

    }
})();