'use strict';

/**
 * @ngdoc function
 * @name playlistApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the playlistApp
 */
angular.module('playlistApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
