'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Menus', '$stateParams', '$window','$http', '$rootScope',
  function ($scope, $state,  Menus, $stateParams, $window, $http, $rootScope) {
    if($window.sessionStorage["userData"] != null || $window.sessionStorage["userData"] != undefined) {
      $scope.user =  JSON.parse($window.sessionStorage["userData"]);
      $scope.currentUser = $scope.user.userData;

  }
 // console.log('reddit', $rootScope.currentRedditUser);
$rootScope.test="dsdadaa";
   if($window.sessionStorage["redditUser"] != null || $window.sessionStorage["redditUser"] != undefined) {console.log('here');

     $scope.userReddit =  JSON.parse($window.sessionStorage["redditUser"]);

    $scope.currentRedditUser = $scope.userReddit.redditUser;
    console.log('redditUser123', $scope.currentRedditUser);
   }

  $scope.logout = function() {
//console.log('redditUser23', $scope.currentRedditUser);
    $http.get('/signout').success(function(res) {console.log('here12');
      console.log('res', res);
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('redditUser');
    $scope.currentUser = '';
    $scope.currentRedditUser = '';
    //$scope.currentRedditUser = false;
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
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);


