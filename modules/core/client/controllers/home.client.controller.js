'use strict';

app.controller('HomeController', ['$scope', '$http', '$state', '$location', '$stateParams', '$window', 'Menus', '$rootScope', '$sce', 'toastr','$localStorage',
    function($scope, $http, $state, $location, $stateParams, $window, Menus, $rootScope, $sce, toastr,$localStorage) {

$scope.urlProtocol = window.location.protocol;
    if($stateParams.id) {
        $http.post('/view', $scope.id).success(function(res) {

        });
        $scope.paramVideoId = $stateParams.id;
        $http.get('/media/' + $scope.paramVideoId).success(function(response) {
            if ($scope.currentUser && response[0].isPrivate == 1) {

                 $location.path("/u/" +$scope.currentUser.username+ "/" +response[0].id);

                $rootScope.media = response[0];
                console.log('$scope.media', $rootScope.media);

                $rootScope.singleMedia = $rootScope.media.outputs;
                $rootScope.movie = {
                    src: $rootScope.singleMedia
                };
            } else {

                $location.path("/p/" +response[0].id);
                $rootScope.media = response[0];

                $rootScope.singleMedia = $rootScope.media.outputs;

                $rootScope.movie = {
                    src: $rootScope.singleMedia
                };
            }
        });
    }
        // This provides Authentication context.
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
                            $window.sessionStorage["userData"] = JSON.stringify(User);
                            $scope.user = JSON.parse($window.sessionStorage["userData"]);
                            $scope.currentUser = $scope.user.userData;
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
                console.log("again check-->> ", myId, myNo);
                var id = myId.split('=')[1];
                var random_no = myNo.split('=')[1];
                

                var confirmSignup = {
                    "id": id,
                    "random_no": random_no
                }
                $.post('/usersignup', confirmSignup, function(data) {
                    console.log('data', data);
                    if (data && data.user) {
                        var User = {
                            "userData": data.user
                        }
                        $window.sessionStorage["userData"] = JSON.stringify(User);
                        $scope.user = JSON.parse($window.sessionStorage["userData"]);
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
                        $window.sessionStorage["userData"] = JSON.stringify(User);
                        $scope.user = JSON.parse($window.sessionStorage["userData"]);
                        $scope.currentUser = $scope.user.userData;
                        
                        if (data && !data.message) {
                            $scope.loader = false;
                            $("#imgloader").css("display", "none");
                            toastr.success('Success: Your Password has been Updated successfully');
                            //window.location.href = "/";
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

        // checkbox select
        $('input[type="checkbox"]').click(function() {
            if ($(this).prop("checked") == true) {
                checked = true;
            } else if ($(this).prop("checked") == false) {
                checked = false;
            }
        });

        $scope.upload = function(e) {
            if($scope.urlProtocol == 'http:') {
                var socket = io('http://192.168.0.148:8005');
            }else {
                var socket = io('https://vidly.io:8005');
            }
           

            // Setup things like filepicker and bootstrap
            filepicker.setKey('Av4QSKNOQSObS35rGlB8Bz');

            // check if localStorage exists so we can use that to store session info
            // We want a person to still be able to listen for notifications in case they
            // refreshed the page while a video was processing.
            var personalChannel;
            if (localStorage) {
                if (localStorage.personalChannel) {
                    // use the channel they've already got if one exists
                    personalChannel = localStorage.personalChannel
                } else {
                    // Nothing already there, so create a new one
                    personalChannel = Math.random().toString(36).substring(7);
                    localStorage.personalChannel = personalChannel;
                }
            } else {
                // The user doesn't support localStorage, but give them a channel anyway
                personalChannel = Math.random().toString(36).substring(7);
            }

            // Filepicker Button
            //$('#pick').click(function(e) {
                //alert(e);
                e.preventDefault();
                var desc = $("#description").val();
                if (desc && desc != null) {
                    filepicker.pick(function(FPFile) {
                        // Disable the picker button while we wait
                        $('#pick').addClass('disabled');
                        // Set the input source to the newly uploaded file and pass along the user's channel
                        var videoSrc = FPFile.url;
                        
                        // Build a request body with the input file and pass the personal channel to the server
                        var request_body = {
                            input_file: videoSrc,
                            channel: personalChannel
                        };
                        // Actually POST the request
                        $.post('/job', request_body, function(data) {
                            // enable the button again
                            $('#pick').removeClass('disabled');
                            //console.log("DATA---> ", data);
                            var saveObj = {
                                mediaId: data.internal_record,
                                isPrivate: checked,
                                description: desc
                            }
                            checked = false;
                            $("#description").val("");
                            $.post('/upload', saveObj, function(response) {
                                console.log("Uploaded-->> ", response);
                            });
                        });
                    }, function(FPError) {
                        // Yikes...something went wrong.
                        console.log(FPError.toString());
                    });
                } else {
                    toastr.error('Request Failed: Give Some Description for Your File to Upload');
                }
            //});

            // Listen for system-wide messages
            socket.on('system', function(data) {
                console.log('here', data);
            });

            // Listen for user-specific messages
            socket.on(personalChannel, function(data) {
              
                if (data.type == 'job.create') { // Just the initial job created callback
                    if (!data.error) {
                         toastr.success('Success: File is currently processing.');
                    } else {
                         toastr.error('Request Failed: We were unable to create a job at this time. Sorry about that.');
                    }
                } else {
                    jobState(data);
                }
            });

            function jobState(notification) {
                switch (notification.state) {
                    case 'failed':
                        toastr.error('Request Failed: Some of the outputs may have succeeded, but at least one failed.');
                        break;
                    case 'finished':
                        toastr.success('Success: Congratulations, the job is finished.');
                        $('#jobs').prepend('<div class="col-sm-3 job-item">' +
                            '  <div class="thumbnail">' +
                            '    <div class="video-thumb">' +
                            '      <a href="/media/' + notification._id + '" class="view-media"><img src="' + notification.thumbnail.url + '"/></a>' +
                            '    </div>' +
                            '  </div>' +
                            '</div>');
                        break;
                }
            }
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.id = {};
        $scope.openVideo = function(data) {
            $scope.id.video_id = data.id;

            if (data.id) {
                    $http.post('/view', $scope.id).success(function(res) {

                    });
                }
            $http.get('/media/' + data.id).success(function(response, header, status, config) { 
                if ($scope.currentUser && response[0].isPrivate == 1) {

                     $location.path("/u/" +$scope.currentUser.username+ "/" +response[0].id);

                    $rootScope.media = response[0];
                    console.log('$scope.media', $rootScope.media);

                    $rootScope.singleMedia = $rootScope.media.outputs;
                    $rootScope.movie = {
                        src: $rootScope.singleMedia
                    };
                } else {

                    $location.path("/p/" +response[0].id);
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
                        //$state.go('home');
                    });
                }//else{
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
                                    "input": JSON.parse(response.total[i].input),
                                    "input_file": response.total[i].input_file,
                                    "isPrivate": response.total[i].isPrivate,
                                    "outputs": response.total[i].outputs,
                                    "state": response.total[i].state,
                                    "submitted_at": response.total[i].submitted_at,
                                    "thumbnail": response.total[i].thumbnail,
                                    "zencoder_id": response.total[i].zencoder_id,
                                    "dislikcount": response.total[i].dislikcount,
                                    "likcount": response.total[i].likcount,
                                    "viewcount": response.total[i].viewcount
                                };

                            if (response.total && response.total[i].userId) {
                              $scope.mediaObj["user"]= response.total[i].user
                            }

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
                        console.log("empty response");
                    }
                //}
            }).error(function(err, header, status, config) {
                console.log(err, header, status, config);
            });
        }


        // $scope.redirecttouser=function(un)
        // {

        //   $location.path("/u/"+un);

        // }

    if ($window.sessionStorage["userData"] != null || $window.sessionStorage["userData"] != undefined) {
        $scope.user = JSON.parse($window.sessionStorage["userData"]);
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
            console.log('response', response)
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

    $scope.redditredirect=function() {


        var uid= $localStorage.userid;
        var uname= $localStorage.username;
        if (uid && uname) {

          
           $scope.userid = uid;
           $scope.username = uname;
           $scope.userInfo($scope.username, $scope.userid,'');
        }

        else if($localStorage.testid)
        {

         

        
            $scope.username=$stateParams.name;

           $scope.userInfo($scope.username, $localStorage.testid,'');

        }
        else
        {
            
            
            $http.get('/reddituser').success(function(response) {
                if (response.alldata != undefined) {
                    $scope.matchId = response.alldata.id;
                    $scope.userid = response.alldata.id;
                    $scope.username = response.alldata.username;
                    if ($stateParams.name == $scope.username) {
                        $scope.userInfo($scope.username, $scope.userid,'redditcase');
                    };
                }
            });
        }
    }



    $scope.redirecttouser=function(name,id)
    {

        $localStorage.testid=id;
        $location.path("/u/"+name);

    }


    $scope.userInfo = function(user,userID,cases) {


       console.log("???????????????",user,"?????????????????????",userID);

       $localStorage.userid=userID;
       $localStorage.username=user;       ;

        $rootScope.usersName = user;
        // $location.path("/u/" +user);

      
        if($localStorage.testid && cases != 'redditcase')
        {
           
           userID=$localStorage.testid;

        }
         $rootScope.particluarUserVedio = [];
         $http.get('/allUserVedioAndInfo/'+userID).success(function(response, header, status, config) {
                if (response) {
                   
                    for (var i = 0; i < response.length; i++) {
                        if(response[i] != undefined) {     
                            $scope.mediaObj = {
                                "channel": response[i].channel,
                                "userID":response[i].userId,
                                "created": response[i].created,
                                "description": response[i].description,
                                "id": response[i].id,
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
                        
                        if (!$localStorage.testid) 
                        {
                        $location.path("/u/" +user);
                    }

                    if (cases == 'redditcase') 
                        {

                            $localStorage.testid="";
                            $localStorage.userid="";
                            $localStorage.username="";
                        $location.path("/u/" +user);
                    }


                } else {
                    console.log("empty response");
                }
                }).error(function(err, header, status, config) {
                    console.log(err, header, status, config);
                });

  
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
                        //$("#msg"+index).text('You have already review this video');
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
                        //$("#msg"+index).text('You have already review this video');
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
                sessionStorage.removeItem('userData');
                sessionStorage.removeItem('username');
                $scope.currentUser = '';
                $scope.signupUser = '';
                $scope.currentRedditUser = '';
                $state.go('home');
            });
        }

        // Expose view variables
        $scope.$state = $state;
        // $scope.authentication = Authentication;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
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
