
module.exports = function(app, passport) {

  app.get('/', function( req, res ){
    res.render( 'index.ejs' );
  });

  app.post('/login',
      passport.authenticate('local', { failureRedirect: '/fail', failureFlash: true }),
      function(req, res) {
          res.redirect('/success');
  });

  app.get('/success', isLoggedIn, function( req, res ){

    var user = req.session.passport.user;
    res.json({'logined': user.userid, 'company': user.company, 'age': user.age });
  });

  app.get('/fail', function( req, res ){
    res.redirect('/');
  });

  app.get('/logout', function( req, res ){
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
