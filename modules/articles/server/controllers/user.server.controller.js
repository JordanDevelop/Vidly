var Zencoder = require('zencoder'),
    nodemailer = require('nodemailer'),
    md5 = require('md5'),
    path = require('path'),
    mysql = require('mysql'),
    randtoken = require('rand-token'),
    fs = require('fs'),
     ses = require('node-ses')
   , client = ses.createClient({ key: 'AKIAJAWT6TMJSMQQSMTA', secret: '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' });
    io = require('socket.io')(8005);

    io.sockets.on('connection', function (socket) {
        console.log("Socket.io Started");
    });


console.log(path.resolve(__dirname));
var dbconfig = require('../../../../db');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "mss.msstest@gmail.com",
        pass: "T4nP&aCq"
    }
});


exports.view = function(req, res) {
    

    var ipstr = req.connection.remoteAddress

    var video_id = req.body.video_id || req.body.id;
    connection.query("SELECT * FROM views WHERE ip ='" + ipstr + "' AND video_id = '" + video_id + "'", function(err, ipresult) {
        if (err) {
            console.log("Errors", err);
        } else {

            if (ipresult.length > 0) {console.log('if');
                console.log("Already Exist...");
                return res.status(200).send('count1');
            } else {console.log('elseeeeeeeee')
                var post = {
                    view_count: 1,
                    ip: ipstr,
                    video_id: video_id
                };
                var query = connection.query('INSERT INTO views SET ?', post, function(err, countresult) {
                    return res.status(200).send('count');
                });
            }
        }
    });
};


exports.like = function(req, res) {
    var video_id = req.body.video_id;
    var lik_dis = req.body.lik_dis;
    
    if (req.session.user && req.session.user.id) {
        var username = req.session.user.username;
        var id = req.session.user.id;
        var email = req.session.user.email;
        var user_id = req.session.user.id;
        console.log("username", username);
        console.log("email", email);
        connection.query("SELECT * FROM likes WHERE user_id = '" + user_id + "' and video_id='" + video_id + "'", function(err, rows) {
            if (err) {
                console.log("Errorsselect", err);
            } else {
                console.log("rows>>>>>", rows);
                if (rows.length > 0) {
                    return res.send({
                        message: "You have already liked this video"
                    });
                } else {
                    console.log("Elseee>>");
                    if (lik_dis == "like") {
                        console.log("likeeeeeeeeeeee>>>>>")
                        var post = {
                            count: 1,
                            user_id: user_id,
                            video_id: video_id
                        };
                        var query = connection.query('INSERT INTO likes SET ?', post, function(err, result) {});
                        connection.query("SELECT count(count) as likecount FROM likes WHERE user_id='" + user_id + "' and video_id='" + video_id + "' and count=1", function(err, likecount) {
                            console.log('likeCount', likecount);
                            if (err) {
                                console.log("Errorsselect2", err);
                                return res.status(400).send({
                                    message: "Error found!"
                                });
                            } else {
                                //console.log("likecount>>>>>>>>>>" , likecount.length);
                                console.log("likecount>>>>>>>>>>", likecount);

                                return res.status(200).send({
                                    likecount: likecount
                                });
                            }
                        });
                    } else {
                        console.log("dislikeeeeeeeeeeee>>>>>")
                        var post = {
                            dislike_count: 1,
                            user_id: user_id,
                            video_id: video_id
                        };
                        var query = connection.query('INSERT INTO likes SET ?', post, function(err, result) {
                            connection.query("SELECT count(dislike_count) as dislike FROM likes  where user_id='" + user_id + "' and video_id='" + video_id + "' and dislike_count=1", function(err, likecount) {
                                if (err) {
                                    console.log("Errors");
                                    return res.status(400).send({
                                        message: "Error found!"
                                    });
                                } else {
                                    console.log("likecount>>>>>>>>>>", likecount.length);
                                    console.log("likecount>>>>>>>>>>", likecount);
                                    return res.status(200).send({
                                        dislikecount: likecount
                                    });
                                }
                            });
                        });
                    }
                }
            }
        });
    } else {
        return res.send({
            message: "Please Login.."
        });
    }
};

exports.confirmSignup = function(req, res) {
    console.log(req.body);
    if (req.body) {
        connection.query('SELECT * FROM users WHERE id = ' + req.body.id, function(err, rows) {
            /* ('SELECT * FROM users WHERE (email="' + user + '" OR username="' + user + '") AND password="' + hashedpwd + '"', function(err, rows) {*/
            console.log("CONFIRM>>>>>>> ", err, rows);
            if (err) {
                return res.status(204).send({
                    message: "Invalid Username!"
                });
            } else {
                if (rows && rows.length > 0) {
                    if (rows[0].random_no == req.body.random_no) {
                        var query = 'UPDATE users SET isActive = true WHERE (id = ' + rows[0].id + ')';
                        console.log("query>>", query);
                        connection.query(query, function(err, newuser1) {
                            if (newuser1) {
                                console.log("mnew user-->>", newuser1);
                                req.session.user = rows[0];
                                return res.status(200).json({
                                    title: 'Zensockets!',
                                    user: rows[0]
                                });
                                console.log("my req.session.user---->> ", req.session.user);

                            } else {
                                console.log("not updated");
                            }
                        });
                    } else {
                        console.log("wrong token");
                    }
                } else {
                    console.log("no result");
                }
            }
        });
    } else {
        console.log("Empty Body Request");
    }
}


exports.home = function(req, res) {
    if (req.session.user) {
        return res.json({
            title: 'Zensockets!',
            user: req.session.user[0]
        });
    } else {
        console.log("No sessions as well as No Params");
        return res.json({
            "title": 'Zensockets!'
        });
    }
};

exports.login = function(req, res) {
    if (req.body && req.body.password) {
        var user = req.body.username;
        var hashedpwd = md5(req.body.password);
        connection.query('SELECT * FROM users WHERE (email="' + user + '" OR username="' + user + '") AND password="' + hashedpwd + '"', function(err, rows) {
            if (err) {
                return res.status(204).send({
                    message: "Invalid Username & Password!"
                });
            } else {
                if (rows && rows.length > 0 && rows[0].IsDelete == 0) { console.log('rows[0].IsDelete', rows[0]);
                    if (rows[0].isActive == true) {
                        
                        req.session.user = rows[0];

                        return res.status(200).json({
                            status: 200,
                            title: 'Zensockets!',
                            user: req.session.user
                        });
                    } else {
                        console.log("Activate your Account First");
                        return res.status(200).send({
                            status: 204,
                            message: "Activate your Account First by clicking on Confirmation Link send to your registered emailid"
                        });
                    }
                    
                } else {
                    return res.status(200).send({
                        status: 204,
                        message: "Invalid Username and/or Password!"
                    });
                }
            }
        });
    } else {
        return res.status(400).send({
            message: "Empty Body Request!!"
        });
    }
};



exports.existence = function(req, res) {
    if(req.params.value) {
        connection.query('SELECT * FROM users WHERE (isReddit=0 AND email="' + req.params.value + '" AND IsDelete=0)', function(err, response) {
            if(response != undefined && response.length) {
                return res.send({message: 'This email is already registered with us!'});
            }else {
                connection.query('SELECT * FROM users WHERE (isReddit=0 AND username="' + req.params.value + '" AND IsDelete=0)', function(err, response) {
                    if(response != undefined && response.length) {
                        return res.send({message: 'This username is already registered with us!'});
                    }else {
                        return res.send({msg:'You can signup'});
                    }
                });
            }
        });
    }else{
        return res.send({msg:'You can signup'});
    }
}

exports.signup = function(req, res) {

    if (req.body) {

        //Check if enter email alredy exists
        connection.query('SELECT * FROM users WHERE (email="' + req.body.email + '" OR username="' + req.body.username + '") AND isReddit=0 AND IsDelete=0', function(err, rows) {
            
            if (err) {
                console.log("errrr????", err);
            } else {
                if (rows.length == 0) {
                    var random_no = randomToken();
                    var today = new Date();
                    console.log('today', today);
                    var post = {
                        email: req.body.email,
                        username: req.body.username,
                        password: md5(req.body.password),
                        random_no: random_no,
                        created: today
                    };
                    connection.query('INSERT INTO users SET ?', post, function(error, resgetid) {
                        if (error) {
                            console.log(error.message);
                        } else {
                            console.log("resgetid>>>>>", resgetid);
                            connection.query('SELECT * FROM users WHERE id = ?', resgetid.insertId, function(err1, result) {
                                if (err1) {
                                    console.log("err");
                                } else {
                                    var name = req.body.username;
                                    var fullUrl = req.protocol + '://' + req.get('host') + '/u/id=' + resgetid.insertId + '&random_no=' + result[0].random_no;
                                    console.log('fullUrl', fullUrl);
                                    var emailBody = "<a href=" + fullUrl + ">Confirm link</a>";
                                    //set mail options
                                    var mailOptions = {
                                        from: 'mss.msstest@gmail.com',
                                        to: req.body.email,
                                        subject: 'Account Registeration Mail',
                                        text: 'Account Registeration Confirmation Mail text here.',
                                        html: "<p> Hello " + name + "</p> <p>Click the below link to activate your account.</p><br/>" + emailBody,
                                    };
                                    client.sendEmail({
                                        to: req.body.email
                                        , from: 'noreply@vidly.io'
                                        , subject: 'Account Registeration Mail'
                                        , message: "<p> Hello " + name + "</p> <p>Click the below link to activate your account.</p><br/>" + emailBody
                                        , altText: 'Account Registeration Confirmation Mail text here.'

                                    }, function (err, data, resp) {
                                            if (error) {console.log('error', error);
                                                return res.send(error);
                                            }
                                            console.log('Message sent successfully');
                                            if (resp.statusCode == 200) {
                                                return res.send({
                                                    status: 200,
                                                    response: req.body.username
                                                });
                                            }
                                    });
                                    //smtpTransport.sendMail(mailOptions, function(error, info) {
                                    //    if (error) {console.log('error', error);
                                    //        return res.status(204).send(error);
                                    //    }
                                    //    console.log('Message sent successfully');
                                    //    return res.status(200).send({
                                    //        status: 200,
                                    //        response: req.body.username
                                    //    });
                                    //});
                                }
                            });
                        }
                    });
                } else {
                    console.log("User Already exist");
                    return res.status(204).send({
                        message: "User Already exist"
                    });
                }
            }
        });
    }
};

exports.listing = function(req, res) {
    //console.log('req', req.session.user);
    if(req.session.user != undefined) {
        connection.query("SELECT * FROM users WHERE username != '"+req.session.user.username+"' AND isDelete = 0", function(err, data) {
            if(data) {
                return res.send({
                    listing: data
                });
            }
        });
    }else {
        return res.send({
            message: 'You are not login!'
        })
    }
}

exports.updateUserData = function(req, res) {console.log('req------>', req.body);
    if(req.body.value == 'isActive') {
        connection.query('UPDATE users SET isActive = '+ req.body.val +' WHERE id ='+ req.body.userId , function(err, response) {
            if(response) {
                return res.send('Updated successfully!');
            }
        });
    }else {
        connection.query('UPDATE users SET makeAdmin = '+ req.body.val +' WHERE id ='+ req.body.userId , function(err, response) {
            if(response) {
                return res.send('Updated successfully.');
            }
        });
    }
}

exports.videoListing = function(req, res) {
    connection.query("SELECT *, (select count(count) from likes l where l.video_id=u.id and count=1) as likcount, (select count(dislike_count) from likes li  where li.video_id=u.id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.id) as viewcount from uploads u  where u.state='finished' and u.isDelete = 0", function(err, data) {
        console.log('listing?????????', err);
        if(data) {
            return res.send({
                listing: data
            });
        }
    });
}


exports.uploadHtml = function(req, res) {
    //console.log("UPLOAD HTML>>>>> ", req.session.user);
    if (req.session.user) {
        return res.json({
            title: 'Zensockets!',
            user: req.session.user[0].username
        });
    } else {
        return res.json({
            title: 'Zensockets!'
        });
    }
};


function randomToken(randomdes) {
    var text = "";
    if(randomdes && randomdes!=''){
     var possible = randomdes;
    for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
       console.log(text);
      return text;

    }else{
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(text);
    return text;
    }
}
exports.changeUsernsfw = function(req,res){

   if (req.body) {
            
            console.log('Seesion is maintned');
            if (req.body.userid) {
                var query = 'UPDATE users SET is_nsfw = ' + req.body.nfsw + ' WHERE id = "' + req.body.userid +'"';
            } else {
                console.log("Invalid User");
            }
         
        connection.query(query, function(err, data) {
            console.log("----------->>>>>> ", data);
            if (err) {
                return res.status(400).send({
                    message: "Something wrong occured, Try Again."
                });
            } else {
                return res.send({
                    message: "success"
                });
            }
        });
   }
   else {
        return res.status(400).send({
            message: "Some Error has been occured!"
        });
    }
}

exports.upload = function(req, res) {
    if (req.body) {
        
        var desid = randomToken(req.body.description);
        desid.replace(/ /g,'');
        var query = 'UPDATE uploads SET nsfw = ' + req.body.NFWS + ',v_id = "' + desid + '",keywords = "' + req.body.keywords + '", description = "' + req.body.description +  '" WHERE id = "' + req.body.mediaId + '"';
      
        if (req.session && req.session.user) {
            console.log('Seesion is maintyned');
            if (req.session.user.id) {
                req.body.userId = req.session.user.id;
                var query = 'UPDATE uploads SET isPrivate = ' + req.body.isPrivate + ',nsfw = ' + req.body.NFWS + ',v_id = "' + desid + '",keywords = "' + req.body.keywords + '", description = "' + req.body.description + '" WHERE userId = "' + req.session.user.id + '"and id = "' + req.body.mediaId + '"';
            } else {
                console.log("M REDDIT USER>>>>> ", req.session.user);
            }
        }

        connection.query(query, function(err, data) {
            console.log("----------->>>>>> ", data);
            if (err) {
                return res.status(400).send({
                    message: "Something wrong occured, Try Again."
                });
            } else {
                return res.send({
                    title: 'Zensockets!',
                    file: data
                });
            }
        });
    } else {
        return res.status(400).send({
            message: "Can't Upload,Empty Body Request"
        });
    }
};

exports.passwordHtml = function(req, res) {
    if (req.session.user) {
        return res.json({
            title: 'Zensockets!',
            user: req.session.user[0].username
        });
    } else {
        return res.json({
            title: 'Zensockets!'
        });
    }
};

exports.loginHtml = function(req, res) {
    res.render('login', {
        title: 'Zensockets!'
    });
};

exports.signupHtml = function(req, res) {
    res.render('signup', {
        title: 'Zensockets!'
    });
};


exports.signout = function(req, res) {
    req.session.destroy();
    //req.logout();
    res.send('true');
};

exports.forgot = function(req, res) {
    res.render('forgot', {
        title: 'Zensockets!'
    });
}

exports.updatePwd = function(req, res) {
    if (req.body && req.body.current) {
        connection.query('SELECT * FROM users WHERE email = ?', req.session.user.email, function(err, rows) {
            if (err) {
                console.log("errrr????>>");
            } else {
                if (rows && rows.length > 0) {console.log('rowss');
                    if (rows[0].password == md5(req.body.current)) {c
                        if (req.body.new == req.body.confirm) {
                            var query = 'UPDATE users SET password = "' + md5(req.body.new) + '" WHERE id = "' + rows[0].id + '"';
                            connection.query(query, function(err, update) {
                                console.log("CHANRGE PASSWORD--->>>", req.session.user);
                                if (!err && update != "") {
                                    req.session.user.password = md5(req.body.new);
                                    res.status(200).send({
                                        title: 'Zensockets!',
                                        user: req.session.user.username
                                    });
                                } else {
                                    return res.status(400).send({
                                        message: "Something wrong occured, Try Again!"
                                    });
                                }
                            });
                        } else {
                            return res.status(400).send({
                                message: "Password & Confirm Password doesnot match!"
                            });
                        }
                    } else {console.log('invalid');
                        return res.status(200).send({
                            message: "Invalid password you entered!"
                        });
                    }
                }
            }
        });
    }
}

exports.resetPwd = function(req, res) {
    //console.log(req.params);
    if (req.params.email) {
        connection.query('SELECT * FROM users WHERE email = ?', req.params.email, function(err, rows) {
            if (err) {
                return res.status(400).send({
                    message: "Your EmailId is not registered!"
                });
            } else {
                if (rows && rows.length > 0) {
                    var token = randtoken.generate(16);
                    var hashedtoken = md5(token);
                    var query = 'UPDATE users SET password = "' + hashedtoken + '" WHERE email = "' + rows[0].email + '"';
                    connection.query(query, function(err, update) {
                        if (!err) {
                            //set mail options
                            var mailOptions = {
                                from: 'mss.msstest@gmail.com',
                                to: rows[0].email,
                                subject: 'Your Vidly Account Password',
                                text: 'Your Vidly Account Password is Attached here.',
                                html: "<p>Password: </p><br/>" + token,
                            };
                            console.log('rows', rows[0]);
                            client.sendEmail({
                                        to: rows[0].email
                                        , from: 'noreply@vidly.io'
                                        , subject: 'Your Vidly Account Password'
                                        , message: "<p> Hello " + rows[0].username + ",</p> <p>Your Vidly Account Password is:</p>" + token,
                                         altText: 'Vidly Account Password.'

                                    }, function (err, data, resp) {
                                            if (err) {console.log('error', err);
                                                return res.send(err);
                                            }
                                            console.log('Message sent successfully');
                                            if (resp.statusCode == 200) {
                                                return res.send({
                                                    status: 200,
                                                    message: "Your Password is sent successfully to Your EmailId"
                                                });
                                            }
                                    });
                            // smtpTransport.sendMail(mailOptions, function(error, info) {
                            //     if (error) {
                            //         return console.log(error);
                            //     } else {
                            //         return res.status(200).send({
                            //             status: 200,
                            //             message: "Your Password is sent successfully to Your EmailId"
                            //         });
                            //     }
                            // });
                        } else {
                            return res.status(200).send({
                            message: "Something wrong occured, Please try Again!"
                        });
                        }
                    });
                } else {
                    return res.status(200).send({
                        message: "Your EmailId is not Registered with Us!"
                    });
                }
            }
        });
    } else {
        return res.status(400).send({
            message: "Empty body Request"
        });
    }
}

var config = {}
    // INK Filepicker API key
config.filepicker = 'Av4QSKNOQSObS35rGlB8Bz';
// Zencoder specific configuration
config.zencoder = {
    api_key: 'a2216d9259ff3f0e387bde6047c06a87', // API key
    output_url: 's3://vidly-bucket/', // Output location for your transcoded videos
    //notification_url: 'https://vidly.io/notify/', // Where Zencoder should POST notifications
    cdn: 'https://c.vidly.io/', // CDN URL
    notification_url: dbconfig.url.notifyUrl, // Where Zencoder should POST notifications

    outputs: function(id) { // Eventually we may want to pass things to our outputs array...
        var outputs = [{
            label: 'MP4',
            base_url: config.zencoder.output_url,
            public: true,
            thumbnails: {
                width: 375,
                height: 220,
                number: 1,
                base_url: config.zencoder.output_url,
                filename: '{{number}}_' + id,
                public: true
            }
        }, {
            label: 'WebM',
            base_url: config.zencoder.output_url,
            format: 'webm',
            public: true
        }]
        return outputs;
    }
}

/*var Media = new Datastore({ filename: 'db/media', autoload: true });*/
var zc = new Zencoder(config.zencoder.api_key);
exports.job = function(req, res) {
    console.log("my check-->>> ", req.body);
    if (req.body) {
        var input = req.body.input_file;
        var channel = req.body.channel;
        var notification_url = config.zencoder.notification_url + channel;
        console.log(",,,,,,,,,,", notification_url);

        if (req.session && req.session.user) {
            var post = {
                userId: req.session.user.id,
                input_file: req.body.input_file,
                channel: req.body.channel,
                submitted_at: new Date(),
                state: 'submitting'
            };
        } else {
            var post = {
                input_file: req.body.input_file,
                channel: req.body.channel,
                submitted_at: new Date(),
                state: 'submitting'
            };
        }

        connection.query('INSERT INTO uploads SET ?', post, function(err, newDoc) {
            console.log("newDoc>>>>> ", err, newDoc);
            if (newDoc) {
                res.send(202, {
                    message: 'Success!',
                    internal_record: newDoc.insertId,
                    notification_namespace: channel
                })

                zc.Job.create({
                    input: input,
                    notifications: notification_url,
                    pass_through: newDoc.insertId,
                    outputs: config.zencoder.outputs(newDoc.insertId)
                }, function(err, data) {
                    if (err) {
                        io.sockets.emit(channel, {
                            error: true,
                            type: 'job.create',
                            message: 'Something has gone terribly wrong...',
                            error: err
                        });
                        var query = 'UPDATE uploads SET state = "' + 'pending' + '" WHERE id = "' + newDoc.insertId + '"';
                        connection.query(query, function(err, update) {
                            console.log("Updated state pending=======>> ", update);
                        });
                        return;
                    }
                    var query = 'UPDATE uploads SET state = "' + 'transcoding' + '" WHERE id = "' + newDoc.insertId + '"';
                    connection.query(query, function(err, success) {
                        io.sockets.emit(channel, {
                            type: 'job.create',
                            message: 'Job created!',
                            job_id: data.id,
                            outputs: data.outputs
                        });
                    });
                });
            }
        })
    }
};
exports.io = function (req) {
    io.sockets.emit(req.id, req.jobDoc);

};

exports.getfinishedurl = function (req, res) {
    query="select v_id from uploads where outputs='"+req.query.url+"'";
    connection.query(query, function(err, doc) {
        if(doc && doc.length>0){
            return res.send({status:"ok",url:req.protocol+"://"+req.get('host')+"/p/"+doc[0].v_id});
       
        }else{
            return res.send({status:"fail",msg:err});
        }
    });

};

exports.removeUser = function(req, res) {
    if(req.session.user && req.params.id) {
        connection.query('UPDATE users SET isDelete = 1 WHERE id ='+ req.params.id , function(err, response) {
            if(response) {
                return res.send('Deleted successfully!');
            }
        });
    }
}
exports.deleteVideo = function(req, res) {
    console.log('req', req.params.id);
    if(req.session.user && req.params.id) {
        var query = 
        connection.query('UPDATE uploads SET isDelete = 1 WHERE id ='+ req.params.id , function(err, response) {
            console.log('response', response)
            if(response) {
                return res.send('Deleted successfully!');
            }
        });
    }
}