'use strict';

app.controller('AdminController', ['$scope','$window','$http', '$sce', function($scope, $window, $http, $sce) {

	if ($window.sessionStorage["userData"] != null || $window.sessionStorage["userData"] != undefined) {
        $scope.user = JSON.parse($window.sessionStorage["userData"]);
        $scope.currentUser = $scope.user.userData;
    }

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

    $scope.trustSrc = function(src) {

  
         return $sce.trustAsResourceUrl(JSON.parse(src
            ));
    }

    $scope.videoList = function() {
    	$http.get('/videoListing').success(function(response) {
    		$scope.allVideos = response.listing;
            console.log('video', $scope.allVideos);
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