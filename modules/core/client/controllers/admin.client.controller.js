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

    //for edit details
    $scope.userData = {};
    $scope.selectValue = function(val, userId, value) {
        console.log('value', value, 'userId', userId);
        $scope.userData.userId = userId; 
        $scope.userData.value = value; 
        $scope.userData.val = val; 
        $http.post('/updateUserData', $scope.userData).success(function(response) {
            console.log('response', response);
        });
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