'use strict';

// Setting up route
 var app = angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    //Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/client/views/home.client.view.html',
        controller: 'HomeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'modules/core/client/views/login.client.view.html',
        controller: 'HomeController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'modules/core/client/views/signup.client.view.html',
        controller: 'HomeController'
      })
      .state('about-us', {
        url: '/about-us',
        templateUrl: 'modules/core/client/views/about-us.client.view.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'modules/core/client/views/contact.client.view.html'
      })
      .state('upload', {
        url: '/upload',
        templateUrl: 'modules/core/client/views/upload.client.view.html',
        controller: 'HomeController'
      })
      .state('video', {
        url: '/p/:id',
        templateUrl: 'modules/core/client/views/video.client.view.html',
        controller: 'HomeController'
      })
      .state('videoUser', {
        url: '/u/:name/:id',
        templateUrl: 'modules/core/client/views/video.client.view.html',
        controller: 'HomeController'
      })
      .state('dashboard', {
          url: '/manage',
          templateUrl: 'modules/core/client/views/admin/admin.client.view.html',
          controller: 'HomeController'
        })
      .state('resetPassword', {
        url: '/reset',
        templateUrl: 'modules/core/client/views/reset.client.view.html',
        controller: 'HomeController'
      })
      .state('forgotPassword', {
        url: '/forgot',
        templateUrl: 'modules/core/client/views/forgot.client.view.html',
        controller: 'HomeController'
      })
      .state('user', {
        url: '/u/:name',
        templateUrl: 'modules/core/client/views/user.client.view.html',
        controller: 'HomeController'
      })
      .state('signout', {
        url: '/signout',
        templateUrl: 'modules/core/client/views/signout.client.view.html',
        controller: 'HomeController'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/views/404.client.view.html',
        data: {
          ignoreState: true
        }
      });
      //$urlRouterProvider.otherwise('/');
  }

]);
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    autoDismiss: false,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    maxOpened: 0,    
    messageClass: 'toast-message',
    newestOnTop: true,
    onHidden: null,
    onShown: null,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    progressBar: false,
    tapToDismiss: true,
    target: 'body',
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 5000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
});

 app.directive('passwordStrength', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'E',
        scope: {
          password: '=ngModel'
        },

        link: function(scope, elem, attrs, ctrl) {
          scope.$watch('password', function(newVal) {

            scope.strength = isSatisfied(newVal && newVal.length >= 8) +
              isSatisfied(newVal && /[A-z]/.test(newVal)) +
              isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
              isSatisfied(newVal && /\d/.test(newVal));

            function isSatisfied(criteria) {
              return criteria ? 1 : 0;
            }
          }, true);
        },
        template: '<div class="progress">' +
          '<div class="progress-bar progress-bar-danger" style="width: {{strength >= 1 ? 25 : 0}}%"></div>' +
          '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 2 ? 25 : 0}}%"></div>' +
          '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 3 ? 25 : 0}}%"></div>' +
          '<div class="progress-bar progress-bar-success" style="width: {{strength >= 4 ? 25 : 0}}%"></div>' +
          '</div>'
      }
    }
  ])
  app.directive('patternValidator', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
          ctrl.$parsers.unshift(function(viewValue) {
            
            var patt = new RegExp(attrs.patternValidator);
            
            var isValid = patt.test(viewValue);

            ctrl.$setValidity('passwordPattern', isValid);

            // angular does this with all validators -> return isValid ? viewValue : undefined;
            // But it means that the ng-model will have a value of undefined
            // So just return viewValue!
            return viewValue;
            
          });
        }
      };
    }
  ]);
