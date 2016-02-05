'use strict';

angular.module('angularFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tutorials', {
        url: '/tutorials',
        templateUrl: 'app/modules/tutorials/tutorials.html',
        controller: 'TutorialsCtrl'
      });
  });
