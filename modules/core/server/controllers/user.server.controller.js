// var mongoose = require('mongoose'),
//     User = mongoose.model('User'),
//     Upload = mongoose.model('Upload'),
//     nodemailer = require('nodemailer'),
//     md5 = require('md5'),
//     randtoken = require('rand-token');

// var smtpTransport = nodemailer.createTransport("SMTP", {
//     service: "Gmail",
//     auth: {
//         user: "mss.msstest@gmail.com",
//         pass: "T4nP&aCq"
//     }
// });

// mongoose.set('debug', true);

// exports.home = function(req, res) {
//     if (req.params('user')) {
//         var update = {
//             isActive: "true",
//         }
//         User.findByIdAndUpdate(req.param('user'), update, function(err, newuser) {
//             // return if found any error
//             var arr = [];
//             arr.push(newuser)
//             req.session.user = arr;
//             console.log("FROM EMAILK CONFIRMATION>>> ", req.session.user);
//             if (!err && newuser) {
//                 res.json({
//                     title: 'Zensockets!',
//                     user: newuser.username
//                 });
//             } else {
//                 return res.json({
//                     message: "Something went Wrong,please try again!!"
//                 });
//             }
//         });
//     } else if (req.session.user) {
//         console.log("SsaasadadadadadasdaIS........", req.session.user);
//         res.json({
// "status":true
//         });
//     } else {
//         console.log("No sessions as well as No Params");
//         res.json({
//             title: 'Zensockets!'
//         });
//     }
// };

// exports.login = function(req, res) {
//     if (req.body) {
//         User.find({
//             $or: [{
//                 $and: [{
//                     email: req.body.username
//                 }, {
//                     password: md5(req.body.password)
//                 }]
//             }, {
//                 $and: [{
//                     email: req.body.email
//                 }, {
//                     password: md5(req.body.password)
//                 }]
//             }]
//         }, function(err, finduser) {
//             // return if found any error
//             if (!err && finduser != "") {
//                 req.session.user = finduser;
//                 console.log("SESSION---->> ", req.session.user);
//                 res.json({
//                     title: 'Zensockets!',
//                     user: finduser
//                 });
//             } else {
//                 return res.json({
//                     message: "Invalid Username & Password"
//                 });
//             }
//         });
//     }
// }

// exports.signup = function(req, res) {
//     console.log("req.body--> ", req.body);
//     if (req.body) {
//         //Check if enter email alredy exists
//         User.findOne({
//             email: req.body.email
//         }).exec(function(err, userFind) {
//             if (err) {
//                 return res.status(200).send({
//                     status: 200,
//                     message: 'OK, Your EmailId can Register!'
//                 });
//             }
//             if (userFind) {
//                 return res.status(200).send({
//                     status: 406,
//                     message: 'Your EmailId is already Registerd!'
//                 });
//             }
//             if (!userFind) {
//                 if (req.body.password == req.body.cpassword)
//                 //console.log("REQUESI BODY IN SIGNUP ", req.body);
//                     var bodyObj = {}
//                 bodyObj.email = req.body.email;
//                 bodyObj.username = req.body.username;
//                 bodyObj.password = md5(req.body.password);
//                 bodyObj.isActive = req.body.isActive;
//                 var user = new User(bodyObj);
//                 user.save(function(err) {
//                     if (err) {
//                         return res.status(400).send({
//                             message: errorHandler.getErrorMessage(err)
//                         });
//                     } else {
//                         var name = user.username;
//                         var fullUrl = req.protocol + '://' + req.get('host') + '/users?user=' + user._id
//                         var emailBody = "<a href=" + fullUrl + ">Confirm link</a>";
//                         //set mail options
//                         var mailOptions = {
//                             from: 'mss.msstest@gmail.com',
//                             to: req.body.email,
//                             subject: 'Account Registeration Mail',
//                             text: 'Account Registeration Confirmation Mail text here.',
//                             html: "<p> Hello " + name + "</p> <p>Click the below link to activate your account.</p><br/>" + emailBody,
//                         };
//                         smtpTransport.sendMail(mailOptions, function(error, info) {
//                             if (error) {
//                                 return res.status(400).send(error);
//                             }
//                             console.log('Message sent successfully');
//                             return res.status(200).send({
//                                 status: 200,
//                                 response: user
//                             });
//                         });
//                     }
//                 });
//             }
//         });
//     }
// };

// exports.getVideos = function(req, res) {
// console.log("getVideos--->>>>>", req.body);

//     Upload.find({}, function(err, media) {
//         if (!err && media != "") {
//             console.log("media---->> ", media);
//             return res.status(200).json(media);
//         } else {
//             console.log("ERROR-->>", err);
//             return res.status(204).json({
//                 message: "No Result found"
//             });
//         }
//     });
// }

// exports.uploadHtml = function(req, res) {
//     //console.log("UPLOAD HTML>>>>> ", req.session.user);
//     if (req.session.user) {
//         res.render('upload', {
//             title: 'Zensockets!',
//             user: req.session.user[0].username
//         });
//     } else {
//         res.render('upload', {
//             title: 'Zensockets!'
//         });
//     }
// };



// exports.upload = function(req, res) {
//     if (req.body) {
//         console.log("UPLOAD CHECK SESSion-->> ", req.session.user);
//         if (req.session && req.session.user && req.session.user[0].id) {
//             req.body.userId = req.session.user[0].id;
//         }
//         var upload = new Upload(req.body);
//         upload.save(function(err, data) {
//             if (err) {
//                 return res.status(400).send({
//                     message: "Something wrong occured, Try Again."
//                 });
//             } else {
//                 res.send({
//                     title: 'Zensockets!',
//                     file: data
//                 });
//             }
//         });
//     } else {
//         return res.status(400).send({
//             message: "Can't Upload,Empty Body Request"
//         });
//     }
// };

// exports.passwordHtml = function(req, res) {
//     if (req.session.user) {
//         res.render('password', {
//             title: 'Zensockets!',
//             user: req.session.user[0].username
//         });
//     } else {
//         res.render('unauth', {
//             title: 'Zensockets!'
//         });
//     }
// };

// exports.loginHtml = function(req, res) {
//     res.render('login', {
//         title: 'Zensockets!'
//     });
// };

// exports.signupHtml = function(req, res) {
//     res.render('signup', {
//         title: 'Zensockets!'
//     });
// };

// exports.mediaSelect = function(req, res) {
//     res.redirect('/public/' + req.params.id);
// }

// exports.play = function(req, res) {
//     Upload.find({
//         _id: req.params.id
//     }, function(err, media) {
//         if (!err && media) {
//             return res.status(200).send({
//                 media: media
//             });
//         } else {
//             return res.status(400).send({
//                 message: "Media Doenot Exist"
//             });
//         }
//     });
// };

// exports.signout = function(req, res) {
//     console.log("Before SIGNOUT-------SESSion-->>>> ", req.session);
//     req.session.destroy();
//     //req.logout();
//     console.log("After Destroy-------SESSion-->>>> ", req.session);
//     res.redirect('/');
// };

// exports.forgot = function(req, res) {
//     res.render('forgot', {
//         title: 'Zensockets!'
//     });
// }

// exports.updatePwd = function(req, res) {
//     console.log("updatePwd", req.body);
//     if (req.body && req.body.current) {
//         var query = {
//             email: req.session.user[0].email,
//             password: md5(req.body.current)
//         }
//         User.find(query, function(err, finduser) {
//             console.log("ERRRRR===", err, "SUCCESS----", finduser);
//             // return if found any error
//             if (!err && finduser != "") {
//                 if (req.body.new == req.body.confirm) {
//                     User.update({
//                         password: md5(req.body.current)
//                     }, {
//                         $set: {
//                             password: md5(req.body.new)
//                         }
//                     }, function(err, update) {
//                         console.log("CHANRGE PASSWORD--->>>", req.session.user);
//                         if (!err && update != "") {
//                             req.session.user[0].password = md5(req.body.new);
//                             res.status(200).send('upload', {
//                                 title: 'Zensockets!',
//                                 user: req.session.user[0].username
//                             });
//                         } else {
//                             return res.status(400).send({
//                                 message: "Something wrong occured, Try Again!"
//                             });
//                         }
//                     });
//                 } else {
//                     return res.status(400).send({
//                         message: "Password & Confirm Password doesnot match!"
//                     });
//                 }
//             } else {
//                 return res.status(200).send({
//                     message: "Invalid password you entered!"
//                 });
//             }
//         });
//     }
// }

// exports.resetPwd = function(req, res) {
//     if (req.body && req.body.email) {
//         User.findOne({
//             email: req.body.email
//         }).exec(function(err, userFind) {
//             console.log(err, "------------", userFind);
//             if (err) {
//                 return res.status(400).send({
//                     message: "Your EmailId is not registered!"
//                 });
//             }
//             if (userFind) {
//                 // Generate a 16 character alpha-numeric token:
//                 var token = randtoken.generate(16);
//                 var hashedtoken = md5(token);
//                 User.update({
//                     email: req.body.email
//                 }, {
//                     $set: {
//                         password: hashedtoken
//                     }
//                 }, function(err, update) {
//                     //set mail options
//                     var mailOptions = {
//                         from: 'mss.msstest@gmail.com',
//                         to: userFind.email,
//                         subject: 'Your Zensockets Account Password',
//                         text: 'Your Zensockets Account Password is Attached here.',
//                         html: "<p>Password: </p><br/>" + token,
//                     };
//                     smtpTransport.sendMail(mailOptions, function(error, info) {
//                         if (error) {
//                             return console.log(error);
//                         } else {
//                             return res.status(200).send({
//                                 status: 200,
//                                 message: "Your Password sent successfully to Your EmailId"
//                             });
//                         }
//                     });
//                 });
//             } else {
//                 return res.status(200).send({
//                     message: 'Your EmailId is not Registerd!'
//                 });
//             }
//         });
//     } else {
//         return res.status(400).send({
//             message: "Empty body Request"
//         });
//     }
// }