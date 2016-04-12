/**
 * Created by christopherlyver on 3/20/16.
 */
(function() {
    'use strict';
    module.exports = function (app, mongoose) {
        // User model
        var userSchema = require(__dirname + '/models/user.schema.server.js')(mongoose);
        var userModel = require(__dirname + '/models/user.model.js')(mongoose, userSchema);
        require(__dirname + '/services/user.service.server.js')(app, userModel);

        // Form and field model
        var fieldSchema = require(__dirname + '/models/field.schema.server.js')(mongoose);
        var formSchema = require(__dirname + '/models/form.schema.server.js')(mongoose, fieldSchema);
        var formModel = require(__dirname + '/models/form.model.js')(mongoose, fieldSchema, formSchema);
        require(__dirname + '/services/field.service.server.js')(app, formModel);
        require(__dirname + '/services/form.service.server.js')(app, formModel);
    };
})();