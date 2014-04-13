'use strict';

angular.module('minionApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$firebaseSimpleLogin', '$location', 'User',
    function($scope, $rootScope, $firebaseSimpleLogin, $location, User) {
      console.log("Login");
      var ref = new Firebase('https://radiant-fire-8775.firebaseio.com/users');
      $scope.credentials = {
        'email': '',
        'password': ''
      };
      $scope.login = function() {
        $firebaseSimpleLogin(ref).$login('password', $scope.credentials)
          .then(function(user) {
            angular.copy(user, User);
            $location.path('/message');
          }, function(error) {
            console.error('Login failed: ', error);
          });

      };


      $scope.register = function() {
        console.log('Registering');
        $firebaseSimpleLogin(ref)
          .$createUser($scope.credentials.email, $scope.credentials.password, true)
          .then(function(err, user) {
            if (err) {
              console.log("Err: " + err);
            } else {
              console.log("User: " + user);
            }
          });
      }

      // listen for user auth events
      $rootScope.$on("login", function(event, user) {
        // do login things
        $scope.user = user;
      });
      $rootScope.$on("loginError", function(event, error) {
        // tell the user about the error
      });
      $rootScope.$on("logout", function(event) {
        // do logout things
      });

    }
  ]);
