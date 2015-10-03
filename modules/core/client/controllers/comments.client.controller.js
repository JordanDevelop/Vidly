app.controller('CommentsController', ['$scope','$window','$http','toastr','$stateParams', function($scope, $window, $http, toastr, $stateParams) {

	if (window.localStorage.getItem("userData") != null || window.localStorage.getItem("userData") != undefined) {
        $scope.user = JSON.parse(window.localStorage.getItem("userData"));
        $scope.currentUser = $scope.user.userData;
    }

    $scope.userComment = {};
    $scope.addComment = function(index,id) {

   
    	if($scope.currentUser != undefined) {	
	    	$scope.userComment.userId = $scope.currentUser.id;
	    	$scope.userComment.v_id = $stateParams.id;
	    	$scope.userComment.comment = $scope.userComment.comment;
	    	$http.post('/comments', $scope.userComment).success(function(response) {
	    		console.log('response', response);
	    		if(response.message) {
	    			$scope.userComment.comment = '';
	    			$("#reply-comment"+id).css("display","none");
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
    		}
    	});
    }

    $scope.openForm =function(idx) {
    	// console.log('idx', idx);
    	// $scope.formOpen = idx;
    	// $("#inner-review").click(function(){

    		console.log(">>>>>>>>>>>>>>>>>>>>>>>>","#reply-comment"+idx);
        $("#reply-comment"+idx).css("display","block");

      //});
    }

 }]);