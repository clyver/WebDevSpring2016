
/**
 * Created by christopherlyver on 4/23/16.
 */
(function() {
    'use strict';

    module.exports = function(mongoose) {
        var userSchema = mongoose.Schema({
            'username': {'type': String, 'unique': true, 'required': true},
            'password': {'type': String, 'required': true},
            'firstName': String,
            'lastName': String,
            'email': String
        }, {'collection': 'projectUser'});
        return userSchema;
    };
})();