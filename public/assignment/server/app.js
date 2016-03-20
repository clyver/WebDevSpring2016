/**
 * Created by christopherlyver on 3/20/16.
 */
module.exports = function (app) {
    var userService = require("./services/user.service.server.js")(app,userModel,null);
    var formService = require("./services/form.service.server.js")(app,formModel,null);
    var fieldService = require("./services/field.service.server.js")(app,formModel,null);
    var userModel = require('./models/user.model.js')();
    var formModel = require('./models/form.model.js')();
}