'use strict';
var core = require('../controllers/core.server.controller');
//var reddituser = require('../controllers/redditlogin.server.controller');
//var user = require('../controllers/user.server.controller');



module.exports = function(app){
// console.log("*****************************************");
//   // Define error pages
   app.route('/server-error').get(core.renderServerError);

//   // Return a 404 for all undefined api, module or lib routes
   app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

//   // Define application route
   app.route('/*').get(core.renderIndex);

//   app.get('/login',reddituser.login);
//   app.get('/auth/reddit',reddituser.authreddit);
//   app.get('/auth/reddit/callback',reddituser.authredditcallback);
//   app.post('/auth/signup',user.signup);
//   app.get('/logout',reddituser.logout);

//   app.post('/login',user.signout);
//   app.get('/signout',user.signout);

//   app.get('/users/:name', user.home);

//   app.get('/users',user.home);
//   app.post('/upload',user.upload);

//   //app.route('/media').get(user.getVideos);

//   //app.get('/media/:id', user.play);


//   app.get('/uploads',user.uploadHtml);
//   app.get('/logins',user.loginHtml);
//   app.get('/signups',user.signupHtml);
//   app.get('/change_pwd', user.passwordHtml);

//   app.post('/resetPassword', user.resetPwd);
//   app.get('/forgotPassword',user.forgot);
//   app.post('/update_pwd', user.updatePwd);
};
