/*
 *
 */

var express  = require('express'),
    app      = express(),
    port     = process.env.PORT || 3000,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash    = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),
    passport = require('passport'),
    db = require('./config/database.js'),
    dbUser = db.login.connect();

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

passport.use(new LocalStrategy({
        usernameField : 'userid',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req,userid, password, done) {

      dbUser.findOne({'name': userid}, function( err, user ){

        if( user && ( user.name == userid && user.password == password ) ){
          var info = {
            'userid': user.name,
            'age': user.age,
            'company': user.company
          }

          return done( null, info );

        }else{

          return done( null, false );
        }
      });
    }
));

require('./routes/index.js' )(app, passport);

app.listen(port);
