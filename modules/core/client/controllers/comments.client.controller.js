app.controller('CommentsController', ['$scope','$window','$http','toastr','$stateParams', function($scope, $window, $http, toastr, $stateParams) {

	if (window.localStorage.getItem("userData") != null || window.localStorage.getItem("userData") != undefined) {
        $scope.user = JSON.parse(window.localStorage.getItem("userData"));
        $scope.currentUser = $scope.user.userData;
    }

    $scope.userComment = {};
    $scope.addComment = function() {
    	if($scope.currentUser != undefined) {	
	    	$scope.userComment.userId = $scope.currentUser.id;
	    	$scope.userComment.v_id = $stateParams.id;
	    	$scope.userComment.comment = $scope.userComment.comment;
	    	$http.post('/comments', $scope.userComment).success(function(response) {
	    		if(response.message) {
	    			$scope.userComment.comment = '';
	    			toastr.success('Success: Comment Inserted');
	    		}else {
	    			toastr.error('Request failed: Something went wrong.');
	    		}
	    	});
    	}else {
    		$scope.userComment.comment = '';
    		toastr.error('Request Failed: Please login first!');
    	}
    }

    $scope.getComment = function() {
    	$http.get('/getComments/'+ $stateParams.id).success(function(response) {
    		if(response != undefined) {
    			$scope.allComments = response.allComments;
    			$scope.commentCount = response.count;
    			var pagesShown = 1;
                var pageSize = 7;
                $scope.paginationLimit = function() {
                    return pageSize * pagesShown;
                };
                $scope.hasMoreItemsToShow = function() {
                    return pagesShown < ($scope.commentCount / pageSize);
                };
                $scope.showMoreItems = function() {
                    pagesShown = pagesShown + 1;
                };
				var commentList = "";
                for (var i=0 ;i<response.allComments.length;i++)
                {
                	if(response.allComments[i].parentID == "0" && response.allComments[i].childID == "0") {
                		if(response.allComments[i].id != undefined) {

                			 
                		commentList =commentList+ "<h5>"+response.allComments[i].username+"<span>2 weeks ago</span></h5>"+
		                   " <p>"+response.allComments[i].comments+"</p>"+
		                    "<p class='reply-review'>"+
		                      "<a href='#' id='inner-review' ng-click='openForm($index)''>Reply</a> 11<span>"+
		                      "<a href='#'><i class='fa fa-thumbs-up'></i></a>"+
		                      "<a href='#'><i class='fa fa-thumbs-down'></i></a></span></p>"+

		                      
		                  "<form id='reply-comment{{$index}}' style='display:none' name='commentForm' ng-submit='updateParentid(, response.allComments[i], $index)'> "+
		                       "<div class='form-group'>"+
		                          "<textarea class='form-control' ng-model='replyComment.comment' placeholder='Add a comment...' required></textarea>"+
		                        "</div>"+
		                        "<div class='form-group'>"+
		                          "<button type='submit'  id='pick' class='btn btn-primary'>Send</button>"+
		                        "</div>"+
		                      "</form>";
                		}
                	}else if (response.allComments[i].parentID=="0" && response.allComments[i].childID =="1") 
                  {


                  	
 					console.log('response.allComments[i]', response.allComments[i].id);
 					if(response.allComments[i].id != undefined) {


				commentList = commentList+"<h5>"+response.allComments[i].username+"<span>2 weeks ago</span></h5>"+
                   " <p>"+response.allComments[i].comments+"</p>"+
                    "<p class='reply-review'>"+
                      "<a href='#' id='inner-review' ng-click='openForm($index)''>Reply</a> 11<span>"+
                      "<a href='#'><i class='fa fa-thumbs-up'></i></a>"+
                      "<a href='#'><i class='fa fa-thumbs-down'></i></a></span></p>"+
                      
                  "<form id='reply-comment{{$index}}' style='display:none' name='commentForm' ng-submit='updateParentid(, response.allComments[i], $index)'> "+
                       "<div class='form-group'>"+
                          "<textarea class='form-control' ng-model='replyComment.comment' placeholder='Add a comment...' required></textarea>"+
                        "</div>"+
                        "<div class='form-group'>"+
                          "<button type='submit'  id='pick' class='btn btn-primary'>Send</button>"+
                        "</div>"+
                      "</form>";
                      $http.get('/parentNodeList/'+response.allComments[i].id).success(function(response) {
	                      	for(var j=0 ;j<response.allChildComments.length;j++) {
                      	console.log('response.allChildComments[i]', response.allChildComments[i]);

	 							if(response.allChildComments[i] !=undefined) {
				                commentList = commentList+ " <div class='top-entry left-margin-entry'>"+
				                         "<div class='user-desp'>"+
				                    "<h5>"+response.allChildComments[i].username+"<span>1 weeks ago</span></h5>"+
				                    "<p>"+response.allChildComments[i].comments+"</p>"+
				                    "<p class='reply-review'>"+
				                      "<a href='#' id='inner-review' ng-click='openForm($index)''>Reply</a> 11<span>"+
				                      "<a href='#'><i class='fa fa-thumbs-up'></i></a>"+
				                      "<a href='#'><i class='fa fa-thumbs-down'></i></a></span></p>"+
				                  "</div>"+
				                  "</div>";
	 							}
	                      	}
 						});				
 					}
                  }					
                }
                $( "#test" ).append(commentList);
    		}
    	});
    }

    $scope.openForm =function(idx) {
    	console
        $("#reply-comment"+idx).css("display","block");
    }

    $scope.replyComment = {};
    $scope.updateParentid = function(commentId, index) {
    	console.log('commentId', commentId);
    	if($scope.currentUser != undefined) {
	        if($scope.replyComment.comment != undefined) {
		        $scope.replyComment.userId = $scope.currentUser.id;
		    	$scope.replyComment.comment = $scope.replyComment.comment;
		    	$scope.replyComment.inheritComment = commentId;
			        $http.post('/updateParentId', $scope.replyComment).success(function(response) {
			        	console.log('response', response);
			        	if(response.message) {
			    			$scope.replyComment.comment = '';
			    			$("#reply-comment"+index).css("display","none");
			    			toastr.success('Success: Comment Successfully Inserted.');
			    		}else {
			    			toastr.error('Request failed: Something went wrong.');
			    		}
			        });
	        }else{
	        	console.log('Give some comment');
	        }
    	}else {
    		toastr.error('Request failed: Please Login first.');
    	}
    }

 }]);



