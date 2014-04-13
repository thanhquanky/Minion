'use strict';

angular.module('minionApp').service('RegistrationService', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.register = function(user) {
        var ref = new Firebase("https://radiant-fire-8775.firebaseio.com/users"); 
        ref.set(user, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('You are successfully registered');
            }
        });
    };
}]);