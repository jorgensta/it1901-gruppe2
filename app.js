
// server.js

// set up ======================================================================
// get all the tools we need
let express  = require('express');
let app      = express();
let port     = process.env.PORT || 8080;
let passport = require('passport');
let flash    = require('connect-flash');
let LocalStrategy = require('passport-local').Strategy;

let morgan       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');

let Datastore = require('nedb');

let db = new Datastore( {filename: __dirname + "/filer/arbeidere.db", autoload: true});
//let configDB = require('./database/database.js');

// configuration ===============================================================

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'lektor' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//Passport setup
passport.serializeUser(function(user,done){
  console.log("serializeUser: " , JSON.stringify(user));
  done(null,user._id);
});


passport.deseralizeUser(function(id, done){
  console.log("deseralizeUser: " + id);
  db.findOne({_id : id}, function(err,doc){
    if(doc){
      return done(null,doc);
    };
  });
});
