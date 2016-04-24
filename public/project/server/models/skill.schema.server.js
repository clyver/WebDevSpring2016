/**
 * Created by christopherlyver on 4/23/16.
 */
(function() {
    'use strict';

    module.exports = function(mongoose) {
        var skillSchema = mongoose.Schema({
            'title': String,
            'level': String,
            'email': String,
            'taught': Boolean,
            'sought': Boolean,
            'userId': String
        }, {'collection': 'projectSkill'});
        return skillSchema;
    };
})();