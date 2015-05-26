
module.exports = function(app, passport) {

  app.get('/', function( req, res ){
    res.render( 'facebookLogin.ejs' );
  });

  app.get('/auth/facebook', passport.authenticate( 'facebook' ));

  app.get('/auth/facebook/callback', passport.authenticate( 'facebook', {
    successRedirect: '/success', failureRedirect: '/fail'
  }));

  app.get( '/success', function(req, res){
    res.send( req.user );
  });

  app.get('/fail', function( req, res ){
    res.redirect('/');
  });

  app.get('/logout', function( req, res ){
    req.logout();
    res.redirect('/');
  });
};
