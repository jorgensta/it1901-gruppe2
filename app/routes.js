


module.exports = function(app,passport){
//get the template for concert. which is in /app/models/concert.js
  let Concert = require('../app/models/concert');


//renders the index page
  app.get('/', function (req,res){
    res.render('index.ejs');

  });
//renders login-in page
  app.get('/login', function(req, res){
    res.render('login.ejs', {message : req.flash('loginmessage' )});
  });



  app.get('/all', isLoggedIn, function(req, res){
    console.log(req.user.local.role);
    //Get the user role from database which is in the req object that we get from express and passport
    let role = req.user.local.role;
    let ejs = ".ejs";
    //Query for finding all concerts, further manipulation of data is done in EJS template.
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
    })
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


};


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }

  res.redirect('/');

}
