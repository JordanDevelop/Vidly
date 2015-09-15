'use strict';

/**
 * Module dependencies.
 */
var articlesPolicy = require('../policies/articles.server.policy'),
    articles = require('../controllers/articles.server.controller'),
    reddituser = require('../controllers/redditlogin.server.controller'),
    user = require('../controllers/user.server.controller');
var xFrameOptions = require('x-frame-options')
   var Zencoder = require('zencoder'),
    express = require('express'),
    cors = require('cors'),
   app = express(),
    path = require('path'),
    mysql = require('mysql');



 //Enabling CORS
// app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});
// app.get('/media/:id', function (req, res, next) {
//     res.get('X-Frame-Options')

//  res.json({msg: 'This is CORS-enabled for all origins!'});
//});
   var allowCrossDomain = function (req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");

       res.header("X-Frame-Options", "ALLOWALL");

       next();
   }
var dbconfig = require('../../../../db');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var config = {}

// INK Filepicker API key
config.filepicker = 'Av4QSKNOQSObS35rGlB8Bz';

// Zencoder specific configuration
config.zencoder = {
    api_key: 'a2216d9259ff3f0e387bde6047c06a87', // API key

    output_url: 's3://vidly-bucket/', // Output location for your transcoded videos
    cdn: 'https://c.vidly.io/' // CDN URL

   // notification_url: 'https://vidly.io/notify/', // Where Zencoder should POST notifications
    notification_url: 'https://vidly.io/notify/',
    //notification_url: 'http://mastersoftwaretechnologies.com:61337/notify',

    outputs: function(id) { // Eventually we may want to pass things to our outputs array...
        var outputs = [{
            label: 'MP4',
            base_url: config.zencoder.cdn,
            public: true,
            thumbnails: {
                width: 375,
                height: 220,
                number: 1,
                base_url: config.zencoder.cdn,
                filename: '{{number}}_' + id,
                public: true
            }
        }, {
            label: 'WebM',
            base_url: config.zencoder.cdn,
            format: 'webm',
            public: true
        }]
        return outputs;
    }
}
module.exports = function(app) {

    //Reddituser routes
    //app.get('/login',reddituser.login);
    app.route('/auth/reddit').get(reddituser.authreddit);
    app.get('/reddituser', reddituser.getreddituser);
    app.get('/auth/reddit/callback', reddituser.authredditcallback);
    app.get('/logout', reddituser.logout);
    app.use(allowCrossDomain);
    //User routes
    // app.get('/users/:name', user.home);
    app.post('/auth/signup', user.signup);
    app.post('/userlogin', user.login);
    app.get('/signout', user.signout);
    app.post('/users', user.home);
    app.post('/upload', user.upload);
    app.post('/checkExistence/:value', user.existence)
    app.post('/usersignup', user.confirmSignup);
    app.get('/userListing', user.listing);
    app.get('/edit/:id', user.edit);
    app.get('/videoListing', user.videoListing);
    app.post('/job', user.job);
    app.get('/uploads', user.uploadHtml);
    app.get('/logins', user.loginHtml);
    app.get('/signups', user.signupHtml);
    app.get('/change_pwd', user.passwordHtml);

    app.post('/resetPassword/:email', user.resetPwd);
    //app.get('/forgotPassword',user.forgot);
    app.post('/update_pwd', user.updatePwd);

    //Views routes
    app.post('/view', user.view);
    app.post('/like', user.like);

    //video routes
    app.route('/media').get(articles.getVideos);
    app.route('/media/:id').get(articles.play);
    app.route('/allUserVedioAndInfo/:userId').get(articles.allUserVedioAndInfo);
    app.route('/updateValue').post(articles.updatevalue);

    app.post('/notify/:id', function(req, res) {
        //console.log('NOTIFY ID HIT BODY>>>> ', req.body);
        res.status(202).send({
            message: "Thanks, Zencoder! We will take it from here."
        });

        // Check and make sure it's a job notification (and not just an output)
        // before saving.
        //console.log('body outputs', req.body.outputs);
        if (req.body.outputs) {
            // this is what will actually get inserted into the DB
            var jobDoc = {
                zencoder_id: req.body.job.id,
                input: req.body.input,
                outputs: {}
            };

            // Check the job status so we can know if it was successful
            if (req.body.job.state == 'finished') {
                jobDoc.state = "finished"
            } else {
                jobDoc.state = "failed"
            }

            req.body.outputs.forEach(function(output) {
                //console.log('output after', output);
                // We only include thumbnails for one output, so use that one
                if (output.thumbnails) {
                    // To keep things simple, just grab the first thumb
                    var thumb = output.thumbnails[0].images[0]
                    jobDoc.thumbnail = {
                        url: thumb.url,
                        size: thumb.dimensions
                    }
                }

                jobDoc.outputs[output.label] = {
                    url: output.url,
                    format: output.format,
                    width: output.width,
                    height: output.height
                }
            });

            /*Media.update({
            _id: req.body.job.pass_through
        }, jobDoc, function(err, doc) { */
            var input = JSON.stringify(jobDoc.input);
            var outputs = JSON.stringify(jobDoc.outputs);
            var outputUrl = jobDoc.outputs.MP4.url;
            var videoUrl = outputUrl.split(":")
            console.log('outputs', videoUrl[1]);
            var thumbnail = JSON.stringify(jobDoc.thumbnail);
            var thumbnailUrl = jobDoc.thumbnail.url;
            var URL = thumbnailUrl.split(":")
            console.log('thumbnail', URL[1]);
            var query = "UPDATE uploads SET zencoder_id = " + jobDoc.zencoder_id + ", input = '" + input + "', outputs = '" + videoUrl[1] + "', state= '" + jobDoc.state + "', thumbnail = '" + URL[1] + "' WHERE id = " + req.body.job.pass_through + "";
            connection.query(query, function(err, doc) {
                console.log("Updated in ROUTES=======>> ", doc);

                if (err) {
                    console.log(err);
                    return;
                }
                // We're done! Let the client know. We also want the notification to
                // include the document id, so add that to the object first.
                jobDoc._id = req.body.job.pass_through;
                //io.sockets.emit(req.params.id, jobDoc);
                var jsonObj = {};
                jsonObj.id = req.params.id;
                jsonObj.jobDoc = jobDoc;
                user.io(jsonObj);
                console.log(">>>>>>>>>>>>>>>>> ", req.session.user, req.params.id, "...........");
                if (req.session) {
                    var query = {
                        "user": req.session.user,
                        "input": jobDoc.input,
                        "outputs": jobDoc.outputs,
                        "state": jobDoc.state,
                        "thumbnail": jobDoc.thumbnail
                    }
                } else {
                    var query = {
                        "input": jobDoc.input,
                        "outputs": jobDoc.outputs,
                        "state": jobDoc.state,
                        "thumbnail": jobDoc.thumbnail
                    }
                }
                /*Upload.update({
                "mediaId": jobDoc._id
            }, {
                $set: query
            }, function(err, res) {
                console.log('done', res);
            });*/
            });
        }
    });




    // Finish by binding the article middlewar
};
