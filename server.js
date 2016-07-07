// require stuff needed
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// load variables from env file
var dotenv = require('dotenv');
dotenv.load();

var db_conf = require('./config/db');

var port = process.env.PORT || 3000;

// connect to db
mongoose.connect(db_conf.url);

// setup express
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

// routes
require('./routes')(app);

// launch
app.listen(port);
console.log('Listening on port '+ port);