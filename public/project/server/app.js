/**
 * Created by christopherlyver on 4/22/16.
 */
(function() {
    'use strict';
    module.exports = function (app) {
        var userModel = require(__dirname + '/models/user.model.js')();
        require(__dirname + '/services/user.service.server.js')(app, userModel);
    };
})();