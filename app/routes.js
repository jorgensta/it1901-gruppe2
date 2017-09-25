module.exports = function(app,passport){


  app.get('/', function (req,res){
    res.render('index.ejs');

  });

  app.get('/login', function(req, res){
    res.render('login.ejs', {message : req.flash('loginmessage' )});
  });

  app.get('/tekniker', function(req, res){
    res.render('tekniker.ejs', {message: req.flash('Signup message')});
  });

  app.get('/arrangor', function(req,res){
    res.render('arrangor.ejs', {message: req.flash('arrangor')})
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
};


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }

  res.redirect('/');

}
