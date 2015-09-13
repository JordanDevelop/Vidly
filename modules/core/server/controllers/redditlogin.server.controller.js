// var Datastore = require('nedb'),
//     passport = require('passport'),
//     util = require('util'),
//     crypto = require('crypto'),
//     RedditStrategy = require('passport-reddit').Strategy,
//     mongoose = require('mongoose'),
//     User = mongoose.model('User'),
//     Upload = mongoose.model('Upload');

// var REDDIT_CONSUMER_KEY = "DRiZeimles1i_w";
// var REDDIT_CONSUMER_SECRET = "f-Cj_BizGJPhI_Q7u9o2GbHqaAU";
// var testname = "";

// passport.serializeUser(function(user, done) {
//     console.log("serializeuser >>>>>>>>>>>>>>>>", user);
//     done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//     done(null, obj);
// });

// passport.use(new RedditStrategy({
//         clientID: REDDIT_CONSUMER_KEY,
//         clientSecret: REDDIT_CONSUMER_SECRET,
//         callbackURL: "http://192.168.0.150:7008/auth/reddit/callback"
//         //put ur own callback url and also in reddit
//     },
//     function(accessToken, refreshToken, profile, done) {
//         var name = profile.name;
//         process.nextTick(function() {
//             //check if verified by reddit
//             if (profile._json.has_verified_email == true) {
//                 User.findOne({
//                     username: name
//                 }).exec(function(err, userFind) {
//                     //if user find in our db
//                     if (userFind) {
//                         var user = userFind.username;
//                         return done(null, user);
//                     }
//                     //if not found with signup
//                     if (!userFind && !err) {
//                         var users = new User({
//                             username: name
//                         });
//                         users.save(function(err, success) {
//                             if (err) {
//                                 return done("An error with Signup has been occured,Try Again", null);
//                             } else {
//                                 var user = success.username;
//                                 return done(null, user);
//                             }
//                         });
//                     } else {
//                         return done(null, profile);
//                     }
//                 });
//             } else {
//                 return done("Please Verify Your EmailId on Reddit before Login", null);
//             }
//         });
//     }
// ));

// exports.login = function(req, res) {
//     res.render('login', {
//         title: 'Zensockets!',
//         user: req.user
//     });
// };

// exports.authreddit = function(req, res, next) {
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>111111111");
//     req.session.state = crypto.randomBytes(32).toString('hex');
//     passport.authenticate('reddit', {
//         state: req.session.state,
//     })(req, res, next);
//     console.log("MY SESSION-->> ", req.session, req.user, req.session.state);

// };

// exports.authredditcallback = function(req, res, next) {
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>111111111", req);
//     testname = req.query.state;
//     var name = 'dsasda';
//     // Check for origin via state token
//     if (req.query.state == req.session.state) {
//         passport.authenticate('reddit', {
//             successRedirect: '/',
//             failureRedirect: '/login'
//         })(req, res, next);
//     } else {
//         next(new Error(403));
//     }
// };

// exports.logout = function(req, res) {
//     req.session.destroy();
//     req.logout();
//     res.redirect('/');
// };

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// }