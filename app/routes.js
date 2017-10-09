


module.exports = function(app,passport){

  let Concert = require('../app/models/concert');

  app.get('/', function (req,res){
    res.render('index.ejs');

  });

  app.get('/login', function(req, res){
    res.render('login.ejs', {message : req.flash('loginmessage' )});
  });



  app.get('/all', isLoggedIn, function(req, res){
    console.log(req.user.local.role);
    //Get the user role from database which is in the req object that we get from express and passport
    let role = req.user.local.role;
    let ejs = ".ejs";
    Concert.find(function (err, conc){
      if(err){
        console.log(err);
      }
      else {
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

  app.get('/arrangor', function(req,res){
    res.render('arrangor.ejs', {message: req.flash('arrangor')})
  });

  app.get('/manager', function(req,res){
    res.render('manager.ejs', {message: req.flash('manager')})
  });

  app.get('/bookingAnsvarlig', function(req,res){
    res.render('bookingAnsvarlig.ejs', {message: req.flash('bookingAnsvarlig')})
  });

  app.get('/signup', function(req,res){
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  });


  app.get('/profile', isLoggedIn,  function(req,res){
    res.render('profile.ejs', {
      user: req.user
    });

  });

  app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
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
