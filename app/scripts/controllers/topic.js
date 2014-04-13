'use strict';

angular.module('minionApp')
.controller('TopicCtrl', function ($scope, $rootScope, $firebase, $location, User) {
    $scope.init = function() { 
        $scope.newTopic = {
            "name": "",
            "creator": User.email,
            "id": parseInt(Math.random()*Date.now())
        }
        $scope.suggestedTopics = ['Sports', 'Music', 'Movies', 'Jokes', 'Games', 'Hobbies', 'Food', 'Celebrity Gossips', 'Work', 'Family', 'Hometown', 'News', 'Arts'];
    };



    var ref = new Firebase('https://radiant-fire-8775.firebaseio.com/topics');
    $scope.topics = $firebase(ref);

    $scope.createChatroom = function(e) {
        if (e.keyCode === 13) {
            $scope.topics.$add($scope.newTopic).then(function(topic, err) {
                var savedId = $scope.newTopic.id;
                $scope.newTopic = {
                    "name": "",
                    "creator": User.email,
                    "id": parseInt(Math.random()*Date.now())
                };
                $location.path('/message/' + savedId);
            });
        }
    };
    
    $scope.joinChatroom = function(roomId) {
        $location.path('/message/' + roomId);
    }
});