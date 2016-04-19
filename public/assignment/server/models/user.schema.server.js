/**
 * Created by christopherlyver on 4/10/16.
 */
(function() {
    'use strict';

    module.exports = function(mongoose) {
        var userSchema = mongoose.Schema({
            'username': {'type': String, 'unique': true, 'required': true},
            'password': {'type': String, 'required': true},
            'firstName': String,
            'lastName': String,
            'emails': [String],
            'phones': [String],
            'roles': [String],
        }, {'collection': 'user'});
        return userSchema;
    };
})();