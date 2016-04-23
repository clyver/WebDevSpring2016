/**
 * Created by christopherlyver on 4/22/16.
 */
(function() {
    'use strict';
    module.exports = function (app, mongoose) {
        // User things
        var userSchema = require(__dirname + '/models/user.schema.server.js')(mongoose);
        var userModel = require(__dirname + '/models/user.model.js')(mongoose, userSchema);
        require(__dirname + '/services/user.service.server.js')(app, userModel);

        // Skill things
        var skillModel = require(__dirname + '/models/skill.model.js')();
        require(__dirname + '/services/skill.service.server.js')(app, skillModel);
    };
})();