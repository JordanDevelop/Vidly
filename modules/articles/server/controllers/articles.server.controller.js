'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mysql = require('mysql');

var dbconfig = require('../../../../db');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var testsession = 0;
 
   
exports.getVideos = function(req, res) {
    testsession = testsession + 1;
   
    //connection.query('SELECT * FROM uploads WHERE state = "finished"', function(err, media) {
        var query="SELECT *, (select count(count) from likes l where l.video_id=u.v_id and count=1) as likcount, (select count(dislike_count) from likes li  where li.video_id=u.v_id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.v_id) as viewcount from uploads u  where u.state='finished' and isPrivate != 1";
        
    connection.query(query, function(err, media) {
    
        if (!err) {
            if(req.session.user){
                query="SELECT *, (select count(count) from likes l where l.video_id=u.v_id and count=1) as likcount, (select count(dislike_count) from likes li  where li.video_id=u.v_id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.v_id) as viewcount from uploads u  where u.state='finished' and isPrivate=1 and userId="+req.session.user.id+"";
            
           connection.query(query, function(err, media1) {
            
                var total= media.concat(media1);
                if(media1 != null){
                    return res.status(200).json({ "total": total, "testsession": testsession });
                }
            })
       }else{

         return res.status(200).json({ "total": media, "testsession": testsession});
       }
        } else {
            return res.status(204).json({
                message: "No Result found"
            });
        }
    });
};

exports.allUserVedioAndInfo = function(req,res){
  if(req.session.user) {
    var query = "SELECT *,(select count(count) from likes where video_id=u.id and count=1) as likecount,(select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikecount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.id) as viewscount  FROM uploads u WHERE u.userId='" + req.params.userId + "'";
  }else {
    query = "SELECT *,(select count(count) from likes where video_id=u.id and count=1) as likecount,(select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikecount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.id) as viewscount  FROM uploads u WHERE isPrivate != 1 and u.userId='" + req.params.userId + "'";
  }

  connection.query(query, function(err, media) {console.log('media', media);
        if (!err && media) {
            return res.status(200).send(media);
        } else {
            return res.status(204).send({
                message: "Media Doenot Exist"
            });
        }
    });
}

exports.updatevalue = function(req, res){
    connection.query('UPDATE uploads SET isPrivate = '+ req.body.isPrivate +' WHERE id ='+ req.body.videoId , function(err, response) {
        if(response) {
            return res.send('Updated successfully!');
        }
    });
}

exports.play = function (req, res) {

    connection.query("SELECT *,(select count(count) from likes where video_id=u.id and count=1) as likecount,(select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikecount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.id) as viewscount  FROM uploads u WHERE u.v_id='" + req.params.id + "'", function (err, media) {
   
        if (!err && media) {
            //console.log("testtest", media);
            return res.status(200).send(media);
        } else {
            return res.status(204).send({
                message: "Media Doenot Exist"
            });
        }
    });
};

