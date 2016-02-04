'use strict';

angular.module('fullstackGitHubbApp', [
  'fullstackGitHubbApp.auth',
  'fullstackGitHubbApp.admin',
  'fullstackGitHubbApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
