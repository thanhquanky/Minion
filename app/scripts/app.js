'use strict';

angular.module('minionApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'ui.bootstrap'
])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/message', {
          templateUrl: 'views/message.html',
          controller: 'MessageCtrl'
      })
      .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
})
.value('User', {});
