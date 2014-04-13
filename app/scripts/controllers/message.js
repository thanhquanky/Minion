'use strict';

angular.module('minionApp')
.controller('MessageCtrl', function ($scope, $rootScope, $firebase, User, $routeParams) {
    $scope.newMessage = {
        "from": User.email,
        "body": ""

    }
    $scope.init = function() { 
        
    };
    $scope.roomId = $routeParams['roomId'];
    var ref = new Firebase('https://radiant-fire-8775.firebaseio.com/topics/' + $scope.roomId+'/message');
    $scope.messages = $firebase(ref);

    $scope.addMessage = function(e) {
        if (e.keyCode === 13) {
            $scope.messages.$add($scope.newMessage);
            $scope.newMessage = {
                "from": User.email,
                "body": ""

            }
        }

    };
});