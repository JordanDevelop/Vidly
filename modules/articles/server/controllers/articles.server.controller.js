'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mysql = require('mysql'),
    async = require('async');

var dbconfig = require('../../../../db');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

exports.getVideos = function(req, res) { 

    //SELECT *, (select count(count) from likes l where l.video_id=u.id and count=1) as likcount, (select count(dislike_count) from likes li  where li.video_id=u.id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select isReddit from users where id=u.userId) as isReddit, (select count(view_count) from views where video_id=u.v_id) as viewcount from uploads u  where u.state='finished' and isPrivate != 1 and nsfw=0 and isDelete=0 and Active=1

        //connection.query('SELECT * FROM uploads WHERE state = "finished"', function(err, media) {
    var query = "SELECT u.*,ur.isDelete as delete1, (select count(count) from likes where video_id=u.id and count=1) as likcount, (select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select isReddit from users where id=u.userId) as isReddit, (select count(view_count) from views where video_id=u.v_id) as viewcount from uploads u left join users ur on u.userId=ur.id where u.isDelete=0 and Active=1 and u.state='finished' and isPrivate!=1 and u.nsfw=0" ;
      //console.log('query not in session', query);
      connection.query(query, function(err, media) {

        if (!err) {
            if (req.session.user && req.session.user.is_nsfw==1) { 
                query = "SELECT u.*,ur.isDelete as delete1, (select count(count) from likes where video_id=u.id and count=1) as likcount, (select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select isReddit from users where id=u.userId) as isReddit, (select count(view_count) from views where video_id=u.v_id) as viewcount from uploads u left join users ur on u.userId=ur.id where u.isDelete=0 and Active=1 and u.state='finished' and isPrivate!=1 and u.nsfw=1";
                connection.query(query, function(err, media1) {

                    var total = media.concat(media1);
                    if (media1 != null) {
                        return res.status(200).json({
                            "total": total,
                        });
                    }
                })
            } else {
                return res.status(200).json({
                    "total": media,
                });
            }
        } else {
            return res.status(204).json({
                message: "No Result found"
            });
        }
    });
};

exports.allUserVedioAndInfo = function(req, res) {
    
    var type = "",
        userid;
    if (req.query && req.query.type) {
        type = req.query.type;
    }
    if (req.query && req.query.id) {
        userid = parseInt(req.query.id);
    }

    var query;
    if (userid!=0) {
        
        query = "SELECT *,(select count(count) from likes where video_id=u.id and count=1) as likecount,(select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikecount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.v_id) as viewscount  FROM uploads u WHERE u.userId=" + userid + "";
        getuserdata(query, function(media) {
           return res.status(200).send(media);
        });
    } else {

        if (type == "reddit") {
           
            query = "SELECT id from users where username='" + req.params.user + "' and isReddit=1";
        } else {
            
            query = "SELECT id from users where username='" + req.params.user + "'";
            }
            connection.query(query, function(err, userid) {
               
                if (!err) {
                      query = "SELECT *,(select count(count) from likes where video_id=u.id and count=1) as likecount,(select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikecount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.v_id) as viewscount  FROM uploads u WHERE isPrivate != 1 and u.userId=" + userid[0].id + "";
                     getuserdata(query, function(media) {
                    return res.status(200).send(media);
                });
                } else {
                  

                }
            });   
    }
}

 function getuserdata(query, callback) {
    
    connection.query(query, function(err, media) {
        if (!err && media) {
            callback(media);
        } else {
            'Media does not exists!'
        }
    });
}


exports.updatevalue = function(req, res) {
    connection.query('UPDATE uploads SET isPrivate = ' + req.body.isPrivate + ' WHERE id =' + req.body.videoId, function(err, response) {
        if (response) {
            return res.send('Updated successfully!');
        }
    });
}

exports.play = function(req, res) {
    
    connection.query("SELECT *,(select count(count) from likes where video_id=u.id and count=1) as likecount,(select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikecount, (select username from users where id=u.userId) as user, (select count(view_count) from views where video_id=u.v_id) as viewscount  FROM uploads u WHERE u.v_id='" + req.params.id + "'", function(err, media) {

        if (!err && media) {
            return res.status(200).send(media);
        } else {
            return res.status(204).send({
                message: "Media Doenot Exist"
            });
        }
    });
};


exports.addComments = function(req, res) {
    if(req.body.v_id && req.session.user) {
        connection.query('SELECT id FROM uploads WHERE v_id ="'+req.body.v_id+'"', function(err, videoId) {
            if(videoId != undefined) {
            var today = new Date();
            var queryString = 'INSERT INTO comments (videoID,comments,parentID,userID,createdAt) VALUES('+videoId[0].id+',"'+req.body.comment+'","0",'+ req.body.userId+','+connection.escape(today) +')';
                connection.query(queryString, function(err, newComments) {console.log('newComments', newComments);
                    if(!err && newComments != undefined) {
                        return res.send({
                            message: 'Comment inserted successfully.'
                        });
                    }else {
                        return res.send({
                            msg: 'Something went wrong.'
                        });
                    }
                });
            }
        });
    }else {
        return res.send('Please Login First');
    }
}

exports.getComments = function(req, res) {
    console.log('req', req.params.id);
    var allData = [];
    if(req.params.id) {
        connection.query('SELECT id FROM uploads WHERE v_id ="'+req.params.id+'"', function(err, videoId) {
            if(videoId != undefined) {
                connection.query('SELECT * FROM comments WHERE videoID ="'+videoId[0].id+'"', function(err, allComments) {
                    //console.log('allComments', allComments);
                     if(allComments != undefined) {

                        async.mapSeries(allComments, function(user, callback) {

                            connection.query('SELECT username FROM users WHERE id="'+user.userID+'"', function(err, userdata) {
                                    var detail={};
                                    detail.id = user.id;
                                    detail.parentID = user.parentID;
                                    detail.childID = user.childID;
                                    detail.videoID = user.videoID;
                                    detail.userID = user.userID;
                                    detail.comments = user.comments;
                                    detail.createdAt = user.createdAt;
                                    detail.updatedAt = user.updatedAt;
                                    detail.username = userdata[0].username;
                                    allData.push(detail);
                                    callback(null);
                                });
                        }, function(err, results) {
                            return res.send({
                                allComments: allData,
                               count: allData.length
                            });
                        });
                    }
                });
            }
        });
    }
}

exports.updateParentId = function(req, res) {
    if(req.session.user && req.body) {
    var today = new Date();
        var parent_id = req.body.inheritComment.parentID;
        if(parent_id !== '0' && parent_id.length >= 1) {
            parent_id = parent_id.concat(',' + req.body.inheritComment.id);
        }else {
            parent_id = req.body.inheritComment.id;
        }
        console.log('parent_id', parent_id);
        connection.query('INSERT INTO comments (videoID,comments,userID,createdAt, parentID) VALUES('+req.body.inheritComment.videoID+',"'+req.body.comment+'",'+ req.body.userId+','+connection.escape(today) +',"'+parent_id+'")', function(err, parentId) {
            if(parentId != undefined) {

                connection.query('UPDATE comments SET childID = 1 WHERE videoID=' + req.body.inheritComment.videoID + ' AND id="'+req.body.inheritComment.id+'" AND parentID=0', function(err, childId) {
                    console.log('childID', childId);
                    return res.send({message:' Comment successfully inserted.'});
                });
            }else {
                return res.send({message: 'Something went wrong'})
            }
        });
    }else {
        return res.send('Please Login First!');
    }
}

exports.parentNodeList = function(req, res) {
    var childData = [];
    connection.query('SELECT * FROM comments WHERE parentID LIKE "'+req.params.id+"%"+'"', function(err, response) {console.log('err', err, 'response', response);
        if(response != undefined) {
            async.mapSeries(response, function(user, callback) {
        var query = 'SELECT username FROM users WHERE id="'+user.userID+'"';
        console.log('query', query);
                connection.query('SELECT username FROM users WHERE id="'+user.userID+'"', function(err, userdata) { console.log('err', err, 'userdata', userdata);
                        var detail={};
                        detail.id = user.id;
                        detail.parentID = user.parentID;
                        detail.childID = user.childID;
                        detail.videoID = user.videoID;
                        detail.userID = user.userID;
                        detail.comments = user.comments;
                        detail.createdAt = user.createdAt;
                        detail.updatedAt = user.updatedAt;
                        detail.username = userdata[0].username;
                        childData.push(detail);
                        callback(null);
                    });
            }, function(err, results) {
                return res.send({
                    allChildComments: childData,
                   count: childData.length
                });
            });
        }
    });
}


exports.search = function(req, res) {
    console.log('req.body', req.body);
    if(req.body != undefined && req.session.user && req.session.user.is_nsfw==1) {

        connection.query('SELECT DISTINCT u.*,ur.isDelete as delete1, (select count(count) from likes where video_id=u.id and count=1) as likcount, (select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select isReddit from users where id=u.userId) as isReddit, (select count(view_count) from views where video_id=u.v_id) as viewcount from uploads u LEFT OUTER JOIN users ur ON u.userId=ur.id WHERE u.keywords LIKE "'+"%"+req.body.searchText+"%"+'" OR u.description LIKE "'+"%"+req.body.searchText+"%"+'" AND u.isDelete=0 and Active=1 and u.state="finished" and isPrivate!=1 and u.nsfw=1', function(err, response) {
            console.log('err', err, 'response', response);
            if(response != undefined) {
                return res.send({
                    result : response
                });
            }else {
                return res.send({
                    message: 'Sorry! No result Found.'
                });
            }
        });
    }else {
        connection.query('SELECT DISTINCT u.*,ur.isDelete as delete1, (select count(count) from likes where video_id=u.id and count=1) as likcount, (select count(dislike_count) from likes where video_id=u.id and dislike_count=1) as dislikcount, (select username from users where id=u.userId) as user, (select isReddit from users where id=u.userId) as isReddit, (select count(view_count) from views where video_id=u.v_id) as viewcount from uploads u LEFT OUTER JOIN users ur ON u.userId=ur.id WHERE u.keywords LIKE "'+"%"+req.body.searchText+"%"+'" OR u.description LIKE "'+"%"+req.body.searchText+"%"+'" AND u.isDelete=0 and Active=1 and u.state="finished" and isPrivate!=1 and u.nsfw=0', function(err, response) {
            console.log('err', err, 'response', response);
            if(response != undefined) {
                return res.send({
                    result : response
                });
            }else {
                return res.send({
                    message: 'Sorry! No result Found.'
                });
            }
        });
    }
}







