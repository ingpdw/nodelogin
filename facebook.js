/*
 *
 */

var express  = require('express'),
    serveStatic = require('serve-static'),
    app      = express(),
    port     = process.env.PORT || 3000,
    passport = require('passport'),
    //LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require( 'passport-facebook' ).Strategy,
    flash    = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),
    passport = require('passport'),
    db = require('./config/database.js'),
    User = db.login.connect();

app.use( serveStatic(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: '***************',
        clientSecret: '**************',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }
    ,function(accessToken,refreshToken, profile, done) {

      User.findOne({'facebookID': profile.id}, function( err, user ){
        if( !user ){

          var user = {
            'name': profile.name,
            'age': 0,
            'company': '',
            'password': '',
            'isFacebook': true,
            'facebookID': profile.id
          };

          var user = new User( user );

          user.save(function(err,silence){
            if(err){
              console.err(err);
              throw err;
            }
            done( null, info);
          });

        }else{
          done( null, user);
        }

      });


    }
));

require('./routes/facebook.js' )(app, passport);

app.listen(port);
