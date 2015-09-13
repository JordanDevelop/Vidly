//var Datastore = require('nedb'),
  var util = require('util'),
    passport = require('passport'),
    crypto = require('crypto'),
    RedditStrategy = require('passport-reddit').Strategy,
    path = require('path'),
    mysql = require('mysql'),
    express = require('express');

var app = express();
app.use(passport.initialize());
app.use(passport.session());


var dbconfig = require('../../../../db');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var REDDIT_CONSUMER_KEY = "gdVbfGJfGnVaYQ";
var REDDIT_CONSUMER_SECRET = "KaUIwEYJLDHBjSyo941pyINctTA";
var testname = "";

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new RedditStrategy({
        clientID: REDDIT_CONSUMER_KEY,
        clientSecret: REDDIT_CONSUMER_SECRET,
        callbackURL: "https://vidly.io/auth/reddit/callback"
        //put ur own callback url and also in reddit
    },
    function(accessToken, refreshToken, profile, done) {
        var name = profile.name;
        process.nextTick(function() {
            //check if verified by reddit
            if (profile._json.has_verified_email == true) {
   
                connection.query('SELECT * FROM users WHERE username = ?', name, function(err, userFind) {
                    //if user find in our db
   
                    if (userFind && userFind.length > 0) {
                           var user = userFind[0];
                        return done(null, user);
                    }
   
                    if (userFind == "" && !err) {
   
                        var user = {
                            username: name,
                            isActive: true,
                            isReddit: 1
                        };
                        connection.query('INSERT INTO users SET ?', user, function(err, success) {
                            if (success && success.length > 0) {
   
                                var user = name;
                                return done(null, user);
                            } else {
                                return done("An error with Signup has been occured,Try Again", null);
                            }
                        });
                    } else {
                        return done(null, profile);
                    }
                });
            } else {
                return done("Please Verify Your EmailId on Reddit before Login", null);
            }
        });
    }
));

exports.authreddit = function(req, res, next) {
   
    req.session.state = crypto.randomBytes(32).toString('hex');

    passport.authenticate('reddit', {
        state: req.session.state
    })(req, res, next);
   
};

exports.authredditcallback = function(req, res, next) {
   
    testname = req.query.state;
    var name = 'dsasda';
   
    if (req.query.state == req.session.state) {
        passport.authenticate('reddit', {
            successRedirect: '/upload',
            failureRedirect: '/login'
        })(req, res, next);
    } else {
        next(new Error(403));
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
};

exports.getreddituser = function(req, res) {    if (req.session && req.session.passport && req.session.passport.user) {
        req.session.user = req.session.passport.user;
   console.log('req', req.session.user);

        return res.status(200).json({
            title: 'Zensockets!',
            user: req.session.user.username,
            alldata: req.session.user
        });
    } else {
        return res.status(204).send({
            message: "Unsuccessful Signup,if with Reddit!"
        });
    }
};

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
