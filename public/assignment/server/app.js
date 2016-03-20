/**
 * Created by christopherlyver on 3/20/16.
 */
(function() {
    'use strict';
    module.exports = function (app) {
        var userModel = require(__dirname + '/models/user.model.js')();
        require(__dirname + '/services/user.service.server.js')(app, userModel);
        var formModel = require(__dirname + '/models/form.model.js')();
        require(__dirname + '/services/form.service.server.js')(app, formModel);
        require(__dirname + '/services/field.service.server.js')(app, formModel);
    };
})();