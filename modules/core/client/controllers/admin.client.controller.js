'use strict';

app.controller('AdminController', ['$scope','$window','$http', function($scope, $window, $http) {

	if ($window.sessionStorage["userData"] != null || $window.sessionStorage["userData"] != undefined) {
        $scope.user = JSON.parse($window.sessionStorage["userData"]);
        $scope.currentUser = $scope.user.userData;
    }

    //for listing of users
    $scope.usersList = function() {
    	$http.get('/userListing').success(function(res, header, status, config) {
            $scope.allUsers = res.listing;
            $scope.curPage = 0;
            $scope.pageSize = 10;
            $scope.allusersCount = $scope.allUsers.length;
    	});
        //for pagination
        $scope.numberOfPages = function(users) {
            return Math.ceil($scope.allusersCount / $scope.pageSize);
        };
    }

    //for listing of videos
    $scope.videoList = function() {
    	$http.get('/videoListing').success(function(response) {
    		$scope.allVideos = response.listing;
    	});
    }	

    //for edit user
    $scope.editUser = function(userId) {
        console.log('userId', userId);
        $scope.userId = userId;
        $http.post('/edit')

    }

}]);

//filter for pagination
angular.module('core').filter('pagination', function() {
    return function(input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
    };
});