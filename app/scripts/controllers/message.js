'use strict';

angular.module('minionApp')
  .controller('MessageCtrl', function ($scope, $rootScope, $firebase, User) {
      $scope.newMessage = {
          "from": User.email,
          "body": ""
          
      }
      $scope.init = function() { 
          console.log("User: " + User.email);
          $scope.newMessage.from = User.email;
      };
      
       var ref = new Firebase('https://radiant-fire-8775.firebaseio.com/messages');
        $scope.messages = $firebase(ref);
        $scope.newMessage = {
          "from" : '',
          "body" : ''
        };
        $scope.addMessage = function(e) {
          if (e.keyCode === 13) {
            $scope.messages.$add($scope.newMessage);
            $scope.newMessage.body = '';
          }

        };
  });