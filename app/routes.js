


module.exports = function(app,passport){


  app.get('/', function (req,res){
    res.render('index.ejs');

  });

  app.get('/login', function(req, res){
    res.render('login.ejs', {message : req.flash('loginmessage' )});
  });



  app.get('/tekniker', function(req, res){
    console.log(req.user.local.role);
    let role = req.user.local.role;
    let ejs = ".ejs";
    res.render(role + ejs, {
      user : req.user, // get the user out of session and pass to template
      message: req.flash('signupMessage')});

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

  app.get('/logout', function (req,res){
    res.logout();
    res.redirect('/');

  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/tekniker',
    failureRedirect: '/signup',
    failureFlash: true
  }));


  app.post('/login', passport.authenticate('local-login'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect('/tekniker');
    });


};


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }

  res.redirect('/');

}
