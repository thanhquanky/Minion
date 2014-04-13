'use strict';

angular.module('minionApp').factory('User', function($rootScope) {
    $rootScope.data = '';
    return function(data) {
       $rootScope.data = data;
    };
});