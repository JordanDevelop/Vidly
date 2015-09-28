'use strict';

app.controller('HomeController', ['$scope', '$http', '$state', '$location', '$stateParams', '$window', 'Menus', '$rootScope', '$sce', 'toastr','$localStorage','$timeout', '$modal', '$log',
    function($scope, $http, $state, $location, $stateParams, $window, Menus, $rootScope, $sce, toastr,$localStorage,$timeout, $modal, $log) {



$scope.toggle = function() {
    $('.navbar-toggle').addClass('collapsed');
    $("button").attr("aria-expanded","false");
    $(".navbar-collapse").attr("aria-expanded","false");
    $( ".navbar-collapse" ).removeClass( "in" );
}


/*-----------make user makeUsernfsw Enabled Start-------------------*/
$scope.updatenfsw = {}; 
$scope.makeUsernfsw = function(id, value){

$scope.updatenfsw.userid = id;
$scope.updatenfsw.nfsw = value;
    
    var user = JSON.parse(window.localStorage.getItem("userData"));
    window.localStorage.removeItem("userData");
      
        $localStorage['userData'] = '';
         
            user.userData.is_nsfw = value;

            window.localStorage.setItem("userData", JSON.stringify(user));
         
    $http.post('/changeUsernsfw', $scope.updatenfsw).success(function(res) {
        if(res.message =='success'){
            if(value===1){
                toastr.success('NSFW activated.');
            }else{
                toastr.success('NSFW deactivated.');
            }
        }else{
            toastr.error('An error has been occured');
        }
        });

}
/*-----------make user makeUsernfsw Enabled End-------------------*/

       

$scope.urlProtocol = window.location.protocol;
       if($stateParams.id ) {
    
        $http.post('/view', $stateParams).success(function(res) {
        });
        $scope.paramVideoId = $stateParams.id;
        $http.get('/media/' + $scope.paramVideoId).success(function(response) {
            if ($scope.currentUser && response[0].isPrivate == 1) {
                 $location.path("/u/" +response[0].user+ "/" +response[0].v_id);
                $rootScope.media = response[0];
                $rootScope.singleMedia = $rootScope.media.outputs;
                $rootScope.movie = {
                    src: $rootScope.singleMedia
                };
            }else if(!$scope.currentUser && response[0].isPrivate == 1) {
                $location.path("/u/" +response[0].user+ "/" +response[0].v_id);
                $rootScope.media = response[0];
                $rootScope.singleMedia = $rootScope.media.outputs;
                $rootScope.movie = {
                    src: $rootScope.singleMedia
                };
            } else {
                if(response.length > 0){
                $location.path("/p/" +response[0].v_id);
                $rootScope.media = response[0];
                $rootScope.singleMedia = $rootScope.media.outputs;
                
                $rootScope.movie = {
                    src: $rootScope.singleMedia
                };
            }else{
                console.log('error page not found');
            }

            }
             /*==Add the some meta tag here for SEO purpose updated by vipin Date:23 Sep 2015=====*/
               
               

               $('meta[property=og\\:title]').attr('content',"Vidly | "+ response[0].description);
               $('meta[property=og\\:url]').attr('content', response[0].outputs);
               $('meta[property=og\\:image]').attr('content', response[0].thumbnail);
            
            /*==Add the some meta tag here for SEO purpose updated by vipin Date:23 Sep 2015=====*/        
        });
    }
        
        $scope.CurrentUser = $stateParams.name;

        $scope.loginObj = {};
        $scope.login = function() {
            $("#imgloader").css("display", "block");
            $scope.loader = true;
            if ($scope.loginObj != null && $scope.loginObj.username != "" && $scope.loginObj.password !== "") {
                $.post('/userlogin', $scope.loginObj, function(data) {
                    
                        if (data && data.user && data.status==200 ) {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            var User = {
                                "userData": data.user
                            }
                            //$localStorage.userData = JSON.stringify(User);
                            window.localStorage.setItem("userData", JSON.stringify(User));
                            $scope.user = JSON.parse(window.localStorage.getItem("userData")); 
                            $scope.currentUser = $scope.user.userData;
                            $scope.is_nsfwUser = $scope.user.userData.is_nsfw;    

                            if($scope.currentUser.role == 'admin') {
                                window.location.href = "/manage";
                            }else {
                                window.location.href = "/upload";
                            }
                        } else {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            toastr.error('Request Failed: '+ data.message);
                        }
                });
            } else {
                $scope.loader = false;
                $("#imgloader").css("display", "none");
                toastr.error('Request Failed: Please Fill Username & Password.');
            }
        };


       $scope.redditUser = function() {
            if ($location.path().indexOf("id") > -1) {
                var myparams = [];
                myparams = $location.path().split('/')[2];
                
                var myId = myparams.split('&')[0];
                var myNo = myparams.split('&')[1];

                var id = myId.split('=')[1];
                var random_no = myNo.split('=')[1];

                var confirmSignup = {
                    "id": id,
                    "random_no": random_no
                }
                $.post('/usersignup', confirmSignup, function(data) {
                    
                    if (data && data.user) {
                        var User = {
                            "userData": data.user
                        }
                         window.localStorage.setItem("userData", JSON.stringify(User));
                         $scope.user = JSON.parse(window.localStorage.getItem("userData")); 
                         $scope.currentUser = $scope.user.userData;
                        window.location.href = "/upload";
                    } else {
                        toastr.error('Request Failed: Invalid Username');
                    }
                });
            } else if ((!$scope.currentUser || $scope.currentUser == '') && !$scope.CurrentUser) {

                $http.get('/reddituser').success(function(response) {
                    
                    if(response.alldata != undefined){
                        $scope.currentRedditUser = response.alldata;
                    }else if(response.message) {
                        toastr.error('Request failed: '+response.message);
                    }
                });
            } else {
                console.log("else of reddit user function");
            }
        }

        $scope.signupObj = {};
        $scope.signup = function() {
   
            $("#imgloader").css("display", "block");
           $scope.loader = true;
           
            if ($scope.signupObj && $scope.signupObj != null && $scope.signupObj.email != "" && $scope.signupObj.username != "" && $scope.signupObj.password != "" && $scope.signupObj.cpassword != "") {
                if (validateEmail($scope.signupObj.email)) {
                    if (validateName($scope.signupObj.username)) {
                        if ($scope.signupObj.password == $scope.signupObj.cpassword) {
                            $.post('/auth/signup', $scope.signupObj, function(data) {
                                if (data && data.status == 200) {
                                    $scope.loader = false;
                                    $("#imgloader").css("display", "none");
                                    $(".textfield").val('');
                                    $("#check1").attr('checked', false);
                                    
                                    toastr.success('Success: Congratulations, A Confirmation Email has been send to your EmailId.');


                                } else {
                                    $scope.loader = false;
                                    $("#imgloader").css("display", "none");
                                    toastr.error('Request Failed: Your EmailId and/or Username is already registered.');
                                }
                            });
                        } else {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            toastr.error('Request Failed: Password & Confirm Password doesnot match');
                        }
                    } else {
                        $scope.loader = false;
                        $("#imgloader").css("display", "none");
                        toastr.error('Request Failed: Please Fill Valid Username');
                    }
                } else {
                    $scope.loader = false;
                    $("#imgloader").css("display", "none");
                    toastr.error('Request Failed: Please Enter Valid EmailId');
                }
            } else {
                $scope.loader = false;
                $("#imgloader").css("display", "none");
                toastr.error('Request Failed: Please Fill Required Basic Details.');
            }
        };

        $scope.reset = function() {
            $("#imgloader").css("display", "block");
            $scope.loader = true;
            if ($scope.resetpswd != null && $scope.resetpswd.email != "") {
                if (validateEmail($scope.resetpswd.email)) {
                    $.post('/resetPassword/' + $scope.resetpswd.email, function(data) {
                        
                        if (data && data.message) {
                            if (data.status == 200) {
                                $scope.loader = false;
                                $("#imgloader").css("display", "none");
                                toastr.success('Success: '+ data.message);
                                $("#login-email").val('');
                            } else {
                                $scope.loader = false;
                                $("#imgloader").css("display", "none");
                                toastr.error('Request Failed: '+ data.message);
                            }
                        } else {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            toastr.error('Request Failed: Invalid EmailId');
                        }
                    });
                } else {
                    $scope.loader = false;
                    $("#imgloader").css("display", "none");
                    toastr.error('Request Failed: Please Enter Valid EmailId');
                }
            } else {
                $scope.loader = false;
                $("#imgloader").css("display", "none");
                toastr.error('Request Failed: Please Fill Your EmailId');
            }
        };

        var pwdObj = {};
        var checked = false;
        $scope.changepswd = function() {
            $("#imgloader").css("display", "block");
           $scope.loader = true;
            pwdObj.current = $("#pwd-current").val();
            pwdObj.new = $("#pwd-new").val();
            pwdObj.confirm = $("#pwd-confirm").val();
            if ($("#pwd-new").val() == $("#pwd-confirm").val()) {
                if (pwdObj && pwdObj !== null && pwdObj.current !== "" && pwdObj.new !== "" && pwdObj.confirm !== "") {
                    $.post('/update_pwd', pwdObj, function(data) {
                        var User = {
                            "userData": data.user[0]
                        }
                       window.localStorage.setItem("userData", JSON.stringify(User));
                        $scope.user = JSON.parse(window.localStorage.getItem("userData")); 
                        $scope.currentUser = $scope.user.userData;
                        
                        if (data && !data.message) {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            toastr.success('Success: Your Password has been Updated successfully');
                           
                        } else if (data && data.message) {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            toastr.error('Request Failed: Invalid Current password you entered');
                        } else {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            toastr.error('Request Failed: Something went wrong, Try Again');
                        }
                    });
                } else {
                    $scope.loader = false;
                    $("#imgloader").css("display", "none");
                    toastr.error('Request Failed: Please Fill All Fields');
                }
            } else {
                $scope.loader = false;
                $("#imgloader").css("display", "none");
                toastr.error('Request Failed: New Password & Confirm Password doesnot match');
            }
        }

        $scope.reddit = function() {
            window.location.href = "/auth/reddit";
        }

       
        $('input[type="checkbox"]').click(function() {
            if ($(this).prop("checked") == true) {
                checked = true;
            } else if ($(this).prop("checked") == false) {
                checked = false;
            }
        });

        $scope.upload = function(e) {
            if($scope.urlProtocol == 'http:') {
                var socket = io('http://192.168.0.163:8005');
            }else {
                var socket = io('https://vidly.io:8005');
            }
            filepicker.setKey('Av4QSKNOQSObS35rGlB8Bz');
            var personalChannel;
            if (localStorage) {
                if (localStorage.personalChannel) {
                    personalChannel = localStorage.personalChannel
                } else {
                    personalChannel = Math.random().toString(36).substring(7);
                    localStorage.personalChannel = personalChannel;
                }
            } else {
                personalChannel = Math.random().toString(36).substring(7);
            }
                e.preventDefault();
                var desc = $("#description").val();
                var length = desc.length;
                var keywords = $("#keywords").val();
                var keyLength = keywords.length;
                var NFWS = '';
                var Private = '';
                if($('#nfws').is(":checked")){
                    NFWS = 1;
                }else{
                    NFWS = 0;
                }
                 if($('#check1').is(":checked")){
                    Private = 1;
                }else{
                   Private = 0;
                }
                var validDescription = validateDesc(desc);
                var validKeys = validateKey(keywords);
                var isValidKeywords = validatekeywords(keywords);
                    if(!validDescription || !validKeys) {
                        toastr.error('Request failed: Please use charaters only!');
                        return false;
                    }else if(!isValidKeywords || keyLength < 4 && keywords != null){
                        toastr.error('Request Failed: You can enter maximum 4 keywords!');
                        return false;  
                    } else {

                        if (length >= 5 && desc != null) {
                            filepicker.pick(function(FPFile) {
                                $('#pick').addClass('disabled');
                                var videoSrc = FPFile.url;
                                var request_body = {
                                    input_file: videoSrc,
                                    channel: personalChannel
                                };
                                $.post('/job', request_body, function(data) {
                                    $('#pick').removeClass('disabled');
                                    var saveObj = {
                                        mediaId: data.internal_record,
                                        isPrivate: Private,
                                        description: desc,
                                        keywords:keywords,
                                        NFWS : NFWS
                                    }
                                    Private = '';
                                    $("#description").val("");
                                    $("#keywords").val("");
                                    $.post('/upload', saveObj, function(response) {
                                        
                                    });
                                });
                            }, function(FPError) {
                                console.log(FPError.toString());
                            });
                        } else {
                            toastr.error('Request Failed: Give Some minimum 5 chracters Description for Your File to Upload');
                        } 
                    }   
                    
                      
                
            socket.on('system', function(data) {
                
            }); 
            socket.on(personalChannel, function(data) {
              
                if (data.type == 'job.create') {  
                    if (!data.error) {
                         toastr.success('Success: File is currently processing.');
                    } else {
                         toastr.error('Request Failed: We were unable to create a job at this time. Sorry about that.');
                    }
                } else {
                    var rawurl=data.outputs.MP4.url.split('/');
                    var url="//c.vidly.io/"+rawurl[rawurl.length-1];
                 $http.get('/getfinishedurl?url='+url).success(function(res) {

                    jobState(res);
                 })                    
                }
            }); 
            function jobState(notification) {
                
                switch (notification.status) {
                    case 'fail':
                        toastr.error('Request Failed: Some of the outputs may have succeeded, but at least one failed.');
                        break;
                    case 'ok':
                        //toastr.success('Success: Congratulations, the job is finished.');

                        $('body .content').append('<div class="overlay"></div>' + '<div class="col-sm-3 job-item">' +
                            '<p class="alert-success">Congratulations, Your video has been uploaded.</p>'+
                           '<a href="'+notification.url+'" target="_blank">Click here</a> to view this video.'+
                           '<div class="congrats-close">'+
                            '<i class="fa fa-times"></i>'+
                            '</div>'+
                            '</div>');
                        $(".congrats-close").click(function(){
                            $(".col-sm-3.job-item").hide();
                            $(".overlay").hide();
                        });
                         
                        break;
                }
            }
        }

 /*-------To validate the description and keyword of vedio start-------------*/

            function validatekeywords(keywords)
               {
                  var isSeprateBycomma = (keywords.split(",").indexOf("") === -1 ? 1:0);
                      if(isSeprateBycomma){
                        var keywordsarray = keywords.split(",");
                         if( keywordsarray.length >= 5){
                           return 0;
                         }else{
                           return isSeprateBycomma;
                         }
                  
                     }else{
                        return isSeprateBycomma;
                     }
                
                }
            function validateDesc(desc) {
                var re = /^[a-zA-Z0-9. ]*$/;
                return re.test(desc);
            }
            function validateKey(desc) {
                var re = /^[a-zA-Z0-9., ]*$/;
                return re.test(desc);
            }


/*-------To validate the description and keyword of vedio End-------------*/

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.id = {};
        $scope.openVideo = function(data) {
            $scope.id.video_id = data.v_id;

            if (data.v_id) {
                    $http.post('/view', $scope.id).success(function(res) {
                    
                    });
                }
            $http.get('/media/' + data.v_id).success(function(response, header, status, config) { 
                if ($scope.currentUser && response[0].isPrivate == 1) {
                     $location.path("/u/" +response[0].user+ "/" +response[0].v_id);

                    $rootScope.media = response[0];
                    $rootScope.singleMedia = $rootScope.media.outputs;
                    $rootScope.movie = {
                        src: $rootScope.singleMedia
                    };
                } else if(!$scope.currentUser && response[0].isPrivate == 1) {
                    $location.path("/u/" +response[0].user+ "/" +response[0].v_id);
                    $rootScope.media = response[0];
                    $rootScope.singleMedia = $rootScope.media.outputs;
                    $rootScope.movie = {
                        src: $rootScope.singleMedia
                    }; 
                } else {
                    $location.path("/p/" +response[0].v_id);
                    $rootScope.media = response[0];

                    $rootScope.singleMedia = $rootScope.media.outputs;

                    $rootScope.movie = {
                        src: $rootScope.singleMedia
                    };
                }

            }).error(function(err, header, status, config) {
                console.log(err, header, status, config);
            });
        }

 
         


        $scope.getVideos = function() {

            if(typeof $scope.currentUser != 'undefined' && $scope.currentUser.is_nsfw == 1){
                $scope.Useris_nsfw = true;
            }
            $scope.novedioFoundmsg_msg = false;
            $scope.novedioFoundmsg = false;
            $("#imgloader").css("display", "block");
            $scope.loader = true;
            $scope.jobs = [];
            $scope.mediaObj = {};
            $http.get('/media').success(function(response, header, status, config) {
               

                if(response.testsession == '1') {
                    $http.get('/signout').success(function(res) {
                        sessionStorage.removeItem('userData');
                        $scope.currentUser = '';
                        $location.path('/'); 
                    });
                } 
                    if (response.total) {
                        
                        $("#imgloader").css("display", "none");
                        $scope.loader = false;
                        for (var i = 0; i < response.total.length; i++) {
                               $scope.mediaObj = {
                                    "channel": response.total[i].channel,
                                    "userID":response.total[i].userId,
                                    "created": response.total[i].created,
                                    "description": response.total[i].description,
                                    "id": response.total[i].id,
                                    "input": response.total[i].input,
                                    "input_file": response.total[i].input_file,
                                    "isPrivate": response.total[i].isPrivate,
                                    "isReddit": response.total[i].isReddit,
                                    "outputs": response.total[i].outputs,
                                    "state": response.total[i].state,
                                    "submitted_at": response.total[i].submitted_at,
                                    "thumbnail": response.total[i].thumbnail,
                                    "zencoder_id": response.total[i].zencoder_id,
                                    "dislikcount": response.total[i].dislikcount,
                                    "likcount": response.total[i].likcount,
                                    "viewcount": response.total[i].viewcount,
                                    "nsfw": response.total[i].nsfw,
                                    "v_id": response.total[i].v_id    
                                };

                            if (response.total && response.total[i].userId) {
                              $scope.mediaObj["user"]= response.total[i].user
                            }
                            
                             $scope.novedioFoundmsg_msg = true;
                             $scope.novedioFoundmsg = false;
                            $scope.jobs.push($scope.mediaObj);
                        };

                        var pagesShown = 1;
                        var pageSize = 9;
                        $scope.paginationLimit = function(data) {
                            return pageSize * pagesShown;
                        };
                        $scope.hasMoreItemsToShow = function() {
                            return pagesShown < ($scope.jobs.length / pageSize);
                        };
                        $scope.showMoreItems = function() {
                            pagesShown = pagesShown + 1;
                        };
                    } else {

                        $scope.novedioFoundmsg_msg = false;
                        $scope.novedioFoundmsg = true;
                         $("#imgloader").css("display", "none");
                          
                    }
                 
            }).error(function(err, header, status, config) {

                console.log(err, header, status, config);
            });
        }


 

   $scope.isnfsw = function(prop, val){
   
   
    return function(mediaObj){
         
      if (mediaObj[prop] == val) return true;
    }

  }


    if (window.localStorage.getItem("userData") != null || window.localStorage.getItem("userData") != undefined) {
        $scope.user = JSON.parse(window.localStorage.getItem("userData"));
        $scope.currentUser = $scope.user.userData;
    }
 
    $scope.downloadLink = function(video) { 
        $scope.videolink = video.outputs;       
        var elVideo = document.createElement("a");
        elVideo.setAttribute("href", $scope.videolink);
        elVideo.setAttribute("download", 'video.mp4');
        elVideo.click();
    }

    $scope.checkvalue = {};
   $scope.checkBoxValue = function(value,  videoId){
    $scope.checkvalue.isPrivate = value;
    $scope.checkvalue.videoId = videoId;
        $http.post('/updateValue', $scope.checkvalue).success(function(response){
            toastr.success('Success: Updated successfully!');
        });
   }

    $scope.userExists = function(value) {
        var email = $scope.signupObj.email;
        var username = $scope.signupObj.username;
        if(value == 'email' && email != undefined){
            $http.post('/checkExistence/'+email).success(function(response){
                if(response.message) {
                    toastr.error('Request Failed: '+ response.message);
                }
                else {
                    console.log(response.msg);
                }
            });
        }else if(value == 'username' && username != undefined){
            $http.post('/checkExistence/'+username).success(function(response){
                if(response.message) {
                    toastr.error('Request Failed:'+ response.message);
                }else {
                    console.log(response.msg);
                }
            });
        }

    }

    $scope.userInfo = function(user,userID,reddit,is_nsfw) { 
        $rootScope.usersName = user;
        console.log('user info', user);
       
       var isreddit;
       
       if(reddit == 1) {console.log('here reddit');
            isreddit = 'reddit';
        if(window.localStorage.getItem("userData"))
        {  console.log('in reddit')
            $location.path("/u/"+user).search('type', isreddit);
        }else{
            $location.path("/p/u/"+user).search('type', isreddit);
        }
        }else{ 
            console.log('normal user')
        }

        var type=$location.search().type;
    
         $rootScope.particluarUserVedio = [];
         $http.get('/allUserVedioAndInfo/'+user+"?type="+type+"&id="+userID).success(function(response, header, status, config) {
            
            $rootScope.val = true;
                if (response) {
                   
                    for (var i = 0; i < response.length; i++) {
                        if(response[i] != undefined) {     
                            $scope.mediaObj = {
                                "channel": response[i].channel,
                                "userID":response[i].userId,
                                "created": response[i].created,
                                "description": response[i].description,
                                "id": response[i].id,
                                "v_id": response[i].v_id,
                                "input": response[i].input,
                                "input_file": response[i].input_file,
                                "isPrivate": response[i].isPrivate,
                                "outputs": response[i].outputs,
                                "state": response[i].state,
                                "submitted_at": response[i].submitted_at,
                                "thumbnail": response[i].thumbnail,
                                "zencoder_id": response[i].zencoder_id,
                                "dislikcount": response[i].dislikecount,
                                "likcount": response[i].likecount,
                                "viewcount": response[i].viewscount
                                
                            };

                            if (response && response[i].userId) {
                              $scope.mediaObj["user"]= response[i].user
                            }

                            $rootScope.particluarUserVedio.push($scope.mediaObj);
                        }else {
                            $scope.msg = 'No Videos yet!';
                        }
                    };
                  
                        var pagesShown = 1;
                        var pageSize = 9;
                        
                        $rootScope.pagination = function() {
                             
                            return pageSize * pagesShown;
                        };
                        $rootScope.hasMoreItemsTo = function() {
                            return pagesShown < ($rootScope.particluarUserVedio.length / pageSize);
                        };
                        $rootScope.MoreItems = function() {
                            pagesShown = pagesShown + 1;       
                        };  

                        if(window.localStorage.getItem("userData"))
                        {  
                        $location.path("/u/"+user);
                        }else{
                        $location.path("/p/u/"+user);
                        }

                } else {
                    console.log("empty response");
                }
                }).error(function(err, header, status, config) {
                    console.log(err, header, status, config);
                });

  
    }

var refresh=window.localStorage.getItem("val");
    if($stateParams.name && !$rootScope.val) {
        var user = $stateParams.name;
    
    var type=$location.search().type;
    
    var userData = JSON.parse(window.localStorage.getItem("userData"));
    if(userData) {
        
        var userID = userData.userData.id;
        $scope.nfsw = userData.userData.is_nsfw;
    }else {
        var userID = 0;
        $scope.nfsw = 0;
    }
    
    $scope.userInfo(user,userID,type,$scope.nsfw);

    }else {
        console.log('not refresh');
    }

 
    $scope.likeValue = {};
    $scope.likeClick = function (id, index, value) {
        if(!$scope.currentUser && !$scope.currentRedditUser) {
            $state.go('login');
        }else {
            var count = 0;
            $scope.likeValue.video_id = id;
            $scope.likeValue.lik_dis = value;
            $http.post('/like', $scope.likeValue).success(function(response) {

                if(value == 'like') {

                    if(response.message) {
                        
                        toastr.info('Info: You have already review this video');
                    }
                    if (response.likecount != undefined) {
                        var count = $("#likeanchor" + index).text();
                        $scope.likeCount = response.likecount[0].likecount;

                        count = parseInt(count) + parseInt($scope.likeCount);

                        $("#likeanchor"+index).text(count);
                    }
                }else {
                    if(response.message) {
                        
                        toastr.info('Info: You have already review this video');
                    }
                    if (response.dislikecount != undefined) {
                        var count = $("#dislike" + index).text();
                        $scope.dislikeLikeCount = response.dislikecount[0].dislike;
                        count = parseInt(count) + parseInt($scope.dislikeLikeCount);

                        $("#dislike"+index).text(count);
                    }

                }
            })
        }

        }
       

        $scope.logout = function() {
            $http.get('/signout').success(function(res) {
                window.localStorage.removeItem("userData");
                $localStorage.username='';
                $scope.currentUser = '';
                $scope.signupUser = '';
                $scope.currentRedditUser = '';
                $localStorage.testid="";
                $state.go('home');
               /* $Timeout(function(){
                    $window.location.reload()
                ,1000});*/
            $timeout(function () { $window.location.reload() }, 1000); 
            });
        }

        
        $scope.$state = $state;
      
        $scope.menu = Menus.getMenu('topbar');
 
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });

    }

]);

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateName(Name) {
    var re = /^[a-zA-Z0-9 ]*$/;
    return re.test(Name);
}



