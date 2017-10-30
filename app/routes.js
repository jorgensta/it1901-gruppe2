


module.exports = function(app,passport){
//get the template for concert. which is in /app/models/concert.js
  let Concert = require('../app/models/concert');

  let Band = require('../app/models/band');

  let User = require('../app/models/user');


//renders the index page
  app.get('/', function (req,res){
    res.render('index.ejs');

  });
//renders login-in page
  app.get('/login', function(req, res){
    res.render('login.ejs', {message : req.flash('loginmessage' )});
  });

  /*  DELETE ? denne er vel unødvendig etter /all
  app.get('/manager', function(req,res){
    res.render('manager.ejs', {message: req.flash('managerMessage')});
  });
  */


  app.get('/all', isLoggedIn, function(req, res){
    console.log(req.user.local.role);
    //Get the user role from database which is in the req object that we get from express and passport
    let role = req.user.local.role;
    let ejs = ".ejs";
    //Query for finding all concerts, further manipulation of data is done in EJS template.

    if(role === 'tekniker' || role === 'arrangor'){
      let mysort = { scene: 1 };
      Concert.find(function (err, conc){
        //if theres an error, log it
        if(err){
          console.log(err);
        }
        else {
          //else, render correct page based on role, and send a list of every concert data over to EJS templates.
          res.render(role + ejs, {
            conc: conc,
            user : req.user,
            message: req.flash('signupMessage')
          });
        }
      }).sort({scene: 1});
    }

    if(role === 'bookingAnsvarlig'){
      Band.find(function(err,info){
        if(err) console.log(err);
        else{
          User.find(function(err, users) {
            if(err) console.log(err);
            else{
              Concert.find(function (err, conc){
                //if theres an error, log it
                if(err){
                  console.log(err);
                }
                else {
                //else, render correct page based on role, and send a list of every concert data over to EJS templates.
                  res.render(role + ejs, {
                  info: info,
                  user: req.user,
                  users: users,
                  conc: conc,
                  message: req.flash('insert message here')
                  });
                }
              })
            }
          })
        }
      })
    }

    if(role === 'manager'){
      Band.find(function(err,band){
        if(err) console.log(err);
        else{
          User.find(function(err, users) {
            if(err) console.log(err);
            else{
              Concert.find(function (err, conc){
                //if theres an error, log it
                if(err){
                  console.log(err);
                }
                else {
                //else, render correct page based on role, and send a list of every concert data over to EJS templates.
                  res.render(role + ejs, {
                  band: band,
                  user: req.user,
                  users: users,
                  conc: conc,
                  message: req.flash('insert message here')
                  });
                }
              })
            }
          })
        }
      })
    }

    if(role === 'bookingSjef'){
      Band.find(function(err,info){
        if(err) console.log(err);
        else{
          User.find(function(err, users) {
            if(err) console.log(err);
            else{
              Concert.find(function (err, conc){
                //if theres an error, log it
                if(err){
                  console.log(err);
                }
                else {
                //else, render correct page based on role, and send a list of every concert data over to EJS templates.
                  res.render(role + ejs, {
                  info: info,
                  user: req.user,
                  users: users,
                  conc: conc,
                  message: req.flash('insert message here')
                  });
                }
              })
            }
          })
        }
      })
    }


    if(role === 'serveringsAnsvarlig'){
      Band.find(function(err,info){
        if(err) console.log(err);
        else{
          Concert.find(function(err, conc){
            if(err) console.log(err);
            else{
              res.render(role + ejs, {
                info: info,
                user: req.user,
                conc: conc,
                message: req.flash('insert message here')
              });
            }
          })
        }
      })
    }

    /*
    // render new page based on role
    res.render(role + ejs, {
      user : req.user, // get the user out of session and pass to template
      message: req.flash('signupMessage')});
*/
  });

//renders login page
  app.get('/signup', function(req,res){
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  });
// logout function when "logout" is pressed
  app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
          console.log("Destroying session, " + req.body.email + " is logged out" )
            res.redirect('/');
        }
    });
  });


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/all',
    failureRedirect: '/signup',
    failureFlash: true
  }));


  app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/all',
    failureRedirect: '/login',
    failureFlash: true
  } ));

  app.post('/manager', function(req,res){

    Band.findOneAndUpdate(
    { $or:  [{band: req.body.band}, {managerEpost: req.body.managerEpost}]}, // find a document with that filter or create a new, if nothing is found
    {
      managerEpost: req.body.managerEpost,
      band: req.body.band,
      teknisk: req.body.teknisk,
      sjanger: req.body.sjanger

    },
    {upsert: true, new: true, runValidators: true}, // options
    function (err, doc) { // callback
        if (err) {
            res.redirect('/all');
        } else {
            res.redirect('/all');
        }
    })
  });

  app.post('/bookingSjefApprove', function(req,res){

    Concert.update(
    { $and:  [{artist: req.body.artistBooked}, {date: req.body.dateBooked}]}, // find a document with that filter or create a new, if nothing is found
    {
      approvedByBookingSjef: true
    },
     // options
    function (err, doc) { // callback
        if (err) {
            console.log(req.body.artistBooked);
            res.redirect('/bullcrap');
        } else {
            console.log(req.body.artistBooked);
            res.redirect('/all');
        }
    })
  });

  app.post('/bookingSjefDecline', function(req,res){

    Concert.deleteOne(
    { $and:  [{artist: req.body.artistBooked}, {date: req.body.dateBooked}]}, // find a document with that filter or create a new, if nothing is found
     // options
    function (err, doc) { // callback
        if (err) {
            console.log(req.body.artistBooked);
            res.redirect('/bullcrap');
        } else {
            console.log(req.body.artistBooked);
            res.redirect('/all');
        }
    })
  });


  app.post('/managerApprove', function(req,res){

    Concert.update(
    { $and:  [{artist: req.body.artistBooked}, {date: req.body.dateBooked}]}, // find a document with that filter or create a new, if nothing is found
    {
      approvedByManager: true
    },
     // options
    function (err, doc) { // callback
        if (err) {
            console.log(req.body.artistBooked);
            res.redirect('/bullcrap');
        } else {
            console.log(req.body.artistBooked);
            res.redirect('/all');
        }
    })
  });

  app.post('/managerDecline', function(req,res){

    Concert.deleteOne(
    { $and:  [{artist: req.body.artistBooked}, {date: req.body.dateBooked}]}, // find a document with that filter or create a new, if nothing is found
     // options
    function (err, doc) { // callback
        if (err) {
            console.log(req.body.artistBooked);
            res.redirect('/bullcrap');
        } else {
            console.log(req.body.artistBooked);
            res.redirect('/all');
        }
    })
  });


  app.post('/bookingMention', function(req,res){

    Concert.update(
    { $and:  [{artist: req.body.artistBooked}, {date: req.body.dateBooked}]}, // find a document with that filter or create a new, if nothing is found
    {
      mention: req.body.mention
    },
     // options
    function (err, doc) { // callback
        if (err) {
            console.log(req.body.artistBooked);
            res.redirect('/bullcrap');
        } else {
            console.log(req.body.artistBooked);
            res.redirect('/all');
        }
    })
  });

  app.post('/addSongs', function(req,res){

    Concert.update(
    { $and:  [{artist: req.body.artistBooked}, {date: req.body.dateBooked}]}, // find a document with that filter or create a new, if nothing is found
    {
      songs: req.body.songs
    },
     // options
    function (err, doc) { // callback
        if (err) {
            console.log(req.body.artistBooked);
            res.redirect('/bullcrap');
        } else {
            console.log(req.body.artistBooked);
            res.redirect('/all');
        }
    })
  });



  app.post('/bookingAnsvarlig', function(req,res){
    new Concert({
      scene: req.body.scene,
      artist: req.body.artist,
      date: req.body.date,
      time: req.body.time,
      lights: req.body.lights,
      sound: req.body.sound,
      rig: req.body.rig,
      arranger: req.body.arranger,
      approvedByBookingSjef: false,
      approvedByManager: false,
      ticketPrice: req.body.ticketPrice,
      duration: req.body.duration
    }).save(function(err,doc){
      if(err) {
        res.redirect('/all');
    }else{
      res.redirect('/all');
    }

    })
  });




};


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }

  res.redirect('/');

}
