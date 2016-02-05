'use strict';

(function() {
  class TutorialsCtrl {
    constructor($http, $scope, socket) {
      $scope.saveTopic = function() {
        $http.post('/api/topics', { name:$scope.topic});
      }


	$scope.getTopics = function() {
	        $http.get('/api/topics', {}).then(response=>{
	        	console.log(response)
	        })
	      }

	      $scope.getTopics();


    }
  }
  angular.module('angularFullstackApp')
    .controller('TutorialsCtrl', TutorialsCtrl);

})()