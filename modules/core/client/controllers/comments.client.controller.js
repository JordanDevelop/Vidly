app.controller('CommentsController', ['$scope','$window','$http','toastr','$stateParams', function($scope, $window, $http, toastr, $stateParams) {

	if (window.localStorage.getItem("userData") != null || window.localStorage.getItem("userData") != undefined) {
        $scope.user = JSON.parse(window.localStorage.getItem("userData"));
        $scope.currentUser = $scope.user.userData;
    }

    $scope.userComment = {};
    $scope.addComment = function() {
    	//console.log('$stateParams', $stateParams);
    	if($scope.currentUser != undefined) {	
	    	$scope.userComment.userId = $scope.currentUser.id;
	    	$scope.userComment.v_id = $stateParams.id;
	    	$scope.userComment.comment = $scope.userComment.comment;
	    	console.log('$scope.userComment', $scope.userComment);
	    	$http.post('/comments', $scope.userComment).success(function(response) {
	    		console.log('response', response);
	    	});
    	}else {
    		toastr.error('Request Failed: Please login first!');
    	}
    }

 }]);