$(function() {
    var signupObj = {};
    var loginObj = {};
    var pwdObj = {};
    var checked = false;

    $("#btn-reset").click(function() {
        loginObj.email = $("#login-email").val();
        if (loginObj && loginObj !== null && loginObj.email !== "") {
            if (validateEmail(loginObj.email)) {
                $.post('/resetPassword', loginObj, function(data) {
                    console.log('Reset response...', data, data.message);
                    if (data && data.message) {
                        if (data.status == 200) {
                            //window.location.href = "/login";
                            $("#imgloader").css("display", "block");
                            displayNotification('success', 'Response!', data.message);
                            var explode = function() {
                                setTimeout(test, 2000)
                            };
                            var test = function() {
                                $("#imgloader").css("display", "none");
                                window.location.href = "/login";
                            }
                            setTimeout(explode, 100);

                        } else {
                            displayNotification('error', 'Request failed', data.message);
                        }
                    } else {
                        displayNotification('error', 'Request failed', 'Invalid EmailId');
                    }
                });
            } else {
                displayNotification('error', 'Request failed', 'Please Enter Valid EmailId');
            }
        } else {
            displayNotification('error', 'Request failed', 'Please Fill Your EmailId');
        }
    });

    $("#btn-login").click(function() { //alert("hi");
        loginObj.username = $("#login-username").val();
        loginObj.password = $("#login-password").val();
        if (loginObj && loginObj !== null && loginObj.username !== "" && loginObj.password !== "") {
            //if (validateEmail(loginObj.username)) {
            $.post('/login', loginObj, function(data) {
                if (data && data.user) {
                    console.log('Login response...', data);
                    window.location.href = "/users/" + data.user[0].username;
                } else {
                    displayNotification('error', 'Request failed', 'Invalid Username & Password');
                }
            });
            /*} else {
                displayNotification('error', 'Request failed', 'Please Enter Valid EmailId');
            }*/
        } else {
            displayNotification('error', 'Request failed', 'Please Fill Username & Password.');
        }
    });

    $("#btn-updatepwd").click(function() {
        pwdObj.current = $("#pwd-current").val();
        pwdObj.new = $("#pwd-new").val();
        pwdObj.confirm = $("#pwd-confirm").val();
        if ($("#pwd-new").val() == $("#pwd-confirm").val()) {
            if (pwdObj && pwdObj !== null && pwdObj.current !== "" && pwdObj.new !== "" && pwdObj.confirm !== "") {
                $.post('/update_pwd', pwdObj, function(data) {
                    if (data && !data.message) {
                        $("#imgloader").css("display", "block");
                        console.log('Get pwdObj Response...', data);
                        displayNotification('success', 'Response!', "Your Password Updated successfully!");
                        var explode = function() {
                            setTimeout(test, 2000)
                        };
                        var test = function() {
                            $("#imgloader").css("display", "none");
                            window.location.href = "/";
                        }
                        setTimeout(explode, 100);
                        //window.location.href = "/";
                    } else if (data && data.message) {
                        displayNotification('error', 'Request failed', 'Invalid Current password you entered!');
                    } else {
                        displayNotification('error', 'Request failed', 'Something went wrong, Try Again!');
                    }
                });
            } else {
                displayNotification('error', 'Request failed', 'Please Fill Required Fields to Update');
            }
        } else {
            displayNotification('error', 'Request failed', 'New Password & Confirm Password doesnot match');
        }
    });

    $("#btn-signup").click(function() { alert("hello");
        signupObj.email = $("#email").val();
        signupObj.username = $("#username").val();
        signupObj.password = $("#password").val();
        signupObj.cpassword = $("#cpassword").val();
        signupObj.isActive = false;
        if (signupObj && signupObj !== null && signupObj.email !== "" && signupObj.username !== "" && signupObj.password !== "" && signupObj.cpassword !== "") {
            if (validateEmail(signupObj.email)) {
                if (validateName(signupObj.username)) {
                    if ($("#password").val() == $("#cpassword").val()) {
                        $.post('/auth/signup', signupObj, function(data) {
                            if (data && data.status == 200) {
                                $("#imgloader").css("display", "block");
                                console.log('Get Response...', data);
                                displayNotification('success', 'Job Success!', 'Congratulations, An Confirmation Email has been send to your EmailId.');
                                $("#email").val("");
                                $("#username").val("");
                                $("#password").val("");
                                $("#cpassword").val("");
                                var explode = function() {
                                    setTimeout(test, 2000)
                                };
                                var test = function() {
                                    $("#imgloader").css("display", "none");
                                    window.location.href = "/login";
                                }
                                setTimeout(explode, 100);
                            } else {
                                displayNotification('error', 'Request failed', 'Signup Failure,Please Try Again!');
                            }
                        });
                    } else {
                        displayNotification('error', 'Request failed', 'Password & Confirm Password doesnot match');
                    }
                } else {
                    displayNotification('error', 'Request failed', 'Please Fill Valid Username');
                }
            } else {
                displayNotification('error', 'Request failed', 'Please Enter Valid EmailId');
            }
        } else {
            displayNotification('error', 'Request failed', 'Please Fill Required Basic Details');
        }
    });

    var socket = io.connect();

    // Setup things like filepicker and bootstrap
    filepicker.setKey(filepicker_api_key);

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

    // checkbox select
    $('input[type="checkbox"]').click(function() {
        if ($(this).prop("checked") == true) {
            checked = true;
        } else if ($(this).prop("checked") == false) {
            checked = false;
        }
        //alert(checked);
    });

    // Filepicker Button
    $('#pick').click(function(e) {
        e.preventDefault();
        var desc = $("#description").val();
        if (desc && desc != null) {
            filepicker.pick(function(FPFile) {
                // Disable the picker button while we wait
                $('#pick').addClass('disabled');
                // Set the input source to the newly uploaded file and pass along the user's channel
                videoSrc = FPFile.url;
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
                        //console.log("Uploaded-->> ", response);
                    });
                });
            }, function(FPError) {
                // Yikes...something went wrong.
                console.log(FPError.toString());
            });
        } else {
            displayNotification('error', 'Request failed', 'Give Some Description for Your File to Upload');
        }
    });


/*
    $('.video-thumb a').click(function(e) {
        e.preventDefault();
        var newurl = '';
        if (history.pushState) {
            //window.history.back();
            newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + 'public/' + $(this).attr('id');
            window.history.pushState({
                path: newurl
            }, '', newurl);
        }
        //console.log("me clicked--->>>", $(this).attr('href') );
        $.getJSON($(this).attr('href'), function(data) {
            showPlayer(data.media);
        });
    });*/

    // Listen for system-wide messages
    socket.on('system', function(data) {
        console.log(data);
    });

    // Listen for user-specific messages
    socket.on(personalChannel, function(data) {
        if (data.type == 'job.create') { // Just the initial job created callback
            if (!data.error) {
                displayNotification('success', 'Job submitted!', 'File is currently processing. <a href="https://app.zencoder.com/jobs/' + data.job_id + '" target="_blank">View job</a>');
            } else {
                displayNotification('error', 'Request failed', 'We were unable to create a job at this time. Sorry about that.');
            }
        } else {
            jobState(data);
        }
    });

    function jobState(notification) {
        switch (notification.state) {
            case 'failed':
                displayNotification('error', 'Job Failed!', 'Some of the outputs may have succeeded, but at least one failed.')
                break;
            case 'finished':
                displayNotification('success', 'Job Success!', 'Congratulations, the job is finished.');
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

    function showPlayer(file) {
        //console.log("my file>> ", file);
        // If there's already a player, get rid of it cleanly.
        if ($('#transcoded').length > 0) {
            videojs('#transcoded').dispose();
        }
        // Create a new video element
        $('#outputs').html('<video id="transcoded" class="video-js vjs-default-skin" height="360px" width="640" poster="' + file[0].thumbnail.url + '"></video>');

        // Add the two sources from the file
        videojs("transcoded", {
            controls: true
        }, function() {
            var video = this;
            var outputs = file[0].outputs;
            var sources = [];

            // Iterate over the outputs available and add them to the sources.
            $.each(outputs, function(index, value) {
                // we only have two outputs, so if it's not mp4 it's webm
                if (value.format == 'mpeg4') {
                    sources.push({
                        type: "video/mp4",
                        src: value.url
                    });
                } else {
                    sources.push({
                        type: "video/webm",
                        src: value.url
                    });
                }
            });
            // set the source
            video.src(sources);
        });
    }

    // Function for displaying notifications
    function displayNotification(type, title, text) {
        var notification = '<div class="alert alert-' + type + '"><strong>' + title + '</strong> ' + text + ' <button type="button" class="close" data-dismiss="alert">×</button></div>';
        $('#notifications').append(notification);
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validateName(Name) {
        var re = /^[a-zA-Z0-9]*$/i;
        return re.test(Name);
    }
});