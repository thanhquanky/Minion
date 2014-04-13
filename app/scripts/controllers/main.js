'use strict';

angular.module('minionApp')
.controller('MainCtrl', function ($scope, $firebase, $location, $modal, $rootScope, $firebaseSimpleLogin, User) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];


    var largeTexts = ['Welcome to Minion', 'How it works?', 'Frequently Asked Questions'];
    var mediumTexts = ['Connections Made Easy','Check out how you can make new friends today!','Check out the many tough questions we\'ve had to answer.'];
    var images = ['images/Images/minion.jpg','images/Images/amigos.jpg','images/Images/college.jpg'];
    for (var i=0; i<3; i++) {
        slides.push({
            image: images[i],
            largeText: largeTexts[i],
            mediumText: mediumTexts[i]
        });
    }

    $scope.openLoginModal = function () {
        console.log("Open login modal");
        var modalInstance = $modal.open({
            templateUrl: 'loginModal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                credentials: function () {
                    return $scope.credentials;
                }
            }
        });

    };
    
    $scope.credentials = {
        "email": "",
        "password" :""
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance, $location, credentials) {
        var ref = new Firebase('https://radiant-fire-8775.firebaseio.com/users');

        $scope.credentials = credentials;
        
        $scope.login = function() {
            $scope.loginError = {};
            $scope.loginSuccess = {};
            $firebaseSimpleLogin(ref).$login('password', $scope.credentials)
            .then(function(user) {
                $scope.loginSuccess = {
                    code: "OK",
                    message: "Flyingggg..."
                };
                angular.copy(user, User);
                $modalInstance.dismiss('cancel');
                $location.path('/message');
            }, function(error) {
                $scope.loginError = {
                    code: error.code,
                    message: error.message
                };
            });

        };


        $scope.register = function() {
            $scope.registerSuccess = {};
            $scope.registerError = {};
            $firebaseSimpleLogin(ref)
            .$createUser($scope.credentials.email, $scope.credentials.password, true)
            .then(function(err, user) {
                if (err) {
                    $scope.registerError = {
                        code: error.code,
                        message: error.message
                    };  
                } else {
                    $scope.registerSuccess = {
                        code: "OK",
                        message: "Welcome to da pack..."
                    };
                    angular.copy(user, User);
                    $modalInstance.dismiss('cancel');
                    $location.path('/message');
                }
            });
        }


        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

   

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
});
