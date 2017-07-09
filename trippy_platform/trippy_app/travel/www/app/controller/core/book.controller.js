(function() {
	'use strict';

	angular.module('bot.module', []).controller(
			'BookController', BookController);

	function BookController($scope, $http, $timeout, $window) {

		
		$scope.init = function(){
		};

		$scope.viewConfirmation = function(trip){
			window.location.href = '../../tpl/app/confirmation.html';
		}

		$scope.init();

	}

})();