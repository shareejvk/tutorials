'use strict';

angular.module('tutorialsApp.auth', [
  'tutorialsApp.constants',
  'tutorialsApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
