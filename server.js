// Our barebones express server
var express = require('express');

var mongoose = require('mongoose');


var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var mongo_connection = 'mongodb://localhost/cs5610';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    mongo_connection = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(mongo_connection);

var bodyParser = require('body-parser');
var app = express();

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, mongoose);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);
