
// server.js

// set up ======================================================================
// get all the tools we need
let express  = require('express');
let app      = express();
let port     = process.env.PORT || 8080;
let passport = require('passport');
let flash    = require('connect-flash');
let path = require('path');
let morgan       = require('morgan');
let mongoose = require('mongoose');

let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');



//let configDB = require('./database/database.js');//worthless
  mongoose.connect('mongodb://localhost/schmuka');
// configuration ===============================================================

require('./config/passport')(passport); // pass passport for configuration

let Concert = require(__dirname + '/app/models/concert');

/*
function createData(){

  var concert = new Concert();

  concert.artist = 'Jogge';
  concert.scene = 'dodens dal';
  concert.date = 'mandag';
  concert.time = '18.00';
  concert.lights = 'Magnus';
  concert.sound = 'Ulrik';
  concert.rig = 'Ole';

  concert.save(function(err){
    if(err) throw err;
    return done(null,concert);
  });


};


createData();

*/

app.use(express.static(__dirname + '/views'));

	// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
app.use(session({ secret: 'lektor' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// routes ======================================================================
require('./app/routes.js')(app, passport,mongoose); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
