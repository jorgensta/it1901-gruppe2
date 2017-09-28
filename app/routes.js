module.exports = function(app,passport){


  app.get('/', function (req,res){
    res.render('index.ejs');

  });

  app.get('/login', function(req, res){
    res.render('login.ejs', {message : req.flash('loginmessage' )});
  });

  app.get('/tekniker', function(req, res){
    res.render('tekniker.ejs', {message: req.flash('signupMessage')});
  });

  app.get('/arrangor', function(req,res){
    res.render('arrangor.ejs', {message: req.flash('arrangor')})
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


  app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/tekniker',
    failureRedirect: '/login',
    failureFlash: true
  }));


};


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }

  res.redirect('/');

}
