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
    dbUser = db.login.connect();

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
        clientID: '****',
        clientSecret: '****',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }
    ,function(accessToken,refreshToken, profile, done) {
      console.log( profile );
      done( null, profile);

    }
));

require('./routes/facebook.js' )(app, passport);

app.listen(port);
