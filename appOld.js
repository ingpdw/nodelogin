var express  = require('express');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

//serializer와 deseriazlier는 필수로 구현해야 함.

// 인증 후, 사용자 정보를 Session에 저장함
passport.serializeUser(function(user, done) {
    done(null, user);
});

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField : 'userid',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req,userid, password, done) {
        if(userid=='pdw' && password=='1111'){
            var user = { 'userid':'pdw',
                          'email':'pdw@gmail.com'};

            return done(null,user);

        }else{

            return done(null,false);

        }
    }
));

var app = express();
app.set('views', __dirname + '/views/');
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));
app.use(passport.initialize()); //passport를 initialize
app.use(passport.session()); //passport에서 session을 사용하도록 설정
app.use(flash()); // use connect-flash for flash messages stored in session

app.get('/', function( req, res ){
  res.render( 'index.ejs' );
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/fail', failureFlash: true }),
    function(req, res) {
        res.redirect('/success');
    });

app.get('/success', function( req, res ){
  res.json({'logined': req.session.passport.user.userid });
});

app.get('/fail', function( req, res ){
  res.json({'logined': '' });
});

app.get('/logout', function( req, res ){
  req.logout();
  res.redirect('/');
});

app.listen(3000);
