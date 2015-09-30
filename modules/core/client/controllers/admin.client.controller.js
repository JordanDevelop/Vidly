'use strict';

app.controller('AdminController', ['$scope','$window','$http','toastr', function($scope, $window, $http, toastr) {

	if (window.localStorage.getItem("userData") != null || window.localStorage.getItem("userData") != undefined) {
        $scope.user = JSON.parse(window.localStorage.getItem("userData"));
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
            if(response.listing != undefined) {    
                $scope.allVideos = response.listing;
                var pagesShown = 1;
                var pageSize = 9;
                $scope.paginationLimit = function() {
                    return pageSize * pagesShown;
                };
                $scope.hasMoreItemsToShow = function() {
                    return pagesShown < ($scope.allVideos.length / pageSize);
                };
                $scope.showMoreItems = function() {
                    pagesShown = pagesShown + 1;
                };
            }
    	});
    }	

    //for edit details
    $scope.userData = {};
    $scope.selectValue = function(val, userId, value) {
        $scope.userData.userId = userId; 
        $scope.userData.value = value; 
        $scope.userData.val = val; 
        $http.post('/updateUserData', $scope.userData).success(function(response) {
            toastr.success('Success: '+response);
        });
    }

    $scope.removeRow = function(id, idx) {
        console.log('id', id);
        var Confirm = confirm("Are you sure you want to delete?");
        if (Confirm == true) {    
            $http.post('/remove/'+id).success(function(response) {
                console.log('response', response);
                $scope.allUsers.splice( $scope.allUsers.indexOf(idx), 1.);
                toastr.success('Success: Deleted successfully!');
            });
        }
    }

    $scope.removeVideo = function(id, data) {
        console.log('id', id);
        var Confirm = confirm("Are you sure you want to delete?");
        if (Confirm == true) {    
            $http.post('/deleteVideo/'+id).success(function(response) {
                console.log('response', response);
                $scope.allVideos.splice( $scope.allVideos.indexOf(data), 1.);
                toastr.success('Success: Deleted successfully!');
            });
        }
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