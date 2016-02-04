'use strict';

angular.module('fullstackGitHubbApp.auth', [
  'fullstackGitHubbApp.constants',
  'fullstackGitHubbApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
