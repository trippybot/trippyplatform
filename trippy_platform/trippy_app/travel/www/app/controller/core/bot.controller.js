(function() {
	'use strict';

	angular.module('bot.module', []).controller(
			'BotController', BotController);

	function BotController($scope, $http, $timeout, $window) {

		$scope.currentUserMessage = '';
		$scope.currentBotMessageId = 0;
		$scope.state = '';
		
		$scope.trips = [];
		$scope.tripsFiltered = [];
		$scope.tripsReady = false;
		
		$scope.currentConversation = {
			id: 1,
			messages: []	
		};
		
		$scope.init = function(){
			
			setTimeout(function(){
				$('.carousel').bcSwipe({
					ride: false,
					wrap : true,
					keyboard : true,
					interval : 500000
				});
			}, 500);
			$scope.loadTrips();
			
			setTimeout(function(){
				ApiAIPlugin.cancelAllRequests()
				ApiAIPlugin.stopListening()				

				$scope.currentUserMessage = 'hola';
				$scope.sendText();
				
			}, 1000);
		};

		$scope.sendText = function() {
			
		    try {
		    	
				$scope.currentConversation.messages.push({
					id: new Date().getTime(),
					text: $scope.currentUserMessage,
					type: 'user',
					date: new Date()
				});
				
				$scope.currentBotMessageId = new Date().getTime() + 10;
				$scope.currentConversation.messages.push({
					id: $scope.currentBotMessageId,
					text: 'loading',
					type: 'app',
					date: $scope.currentBotMessageId
				});
				$scope.state = 'loading';
				
				ApiAIPlugin.requestText({
					query : $scope.currentUserMessage
				}, function(response) {
					$scope.addMessage(response);
					$scope.clearValues();
					
					if(response.result.fulfillment.speech == 'Estoy buscando lo mejor para ti... chécate estas opciones'){
						$scope.currentBotMessageId = new Date().getTime() + 10;
						$scope.currentConversation.messages.push({
							id: $scope.currentBotMessageId,
							text: 'loading',
							type: 'app',
							date: $scope.currentBotMessageId
						});
						$scope.state = 'loading';
						
						setTimeout(function(){
							$scope.tripsReady = true;
							$scope.$apply();
						}, 1500);
					}
					
				}, function(error) {
					$scope.addUnknownMessage();
					$scope.clearValues();
				});
			} catch (e) {
				$scope.addUnknownMessage();
			}
			
		};
		
		$scope.loadTrips = function(){
			
			$http.get('http://10.30.3.109:8087/back-ws/search/getAllTrips',{
			    headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
			}).success(function(data) {
				$scope.trips = data;
				
				angular.forEach($scope.trips, function(n,i){

					var total = 0;
					total = n.flight.amount;
					
					angular.forEach(n.funs, function(tt,ii){
						total += tt.amount;
					});
					
					angular.forEach(n.restaurants, function(tt,ii){
						total += tt.amount;
					});
					
					angular.forEach(n.hotels, function(tt,ii){
						total += tt.amount;
					});
					
					$scope.trips[i].total = total;
					
				});
				
			});			
			
		}
		
		$scope.viewTrip = function(trip){
			window.location.href = '../../tpl/app/detail.html';
		}

		$scope.clearValues = function(){
			$scope.currentUserMessage = '';
			$scope.currentBotMessageId = 0;
			$scope.state = '';
		}

		$scope.addUnknownMessage = function(){
			$scope.currentConversation.messages.push({
				id: new Date().getTime(),
				text: 'Lo siento, no logro entenderte ...',
				type: 'app',
				date: new Date()
			});
		}

		$scope.addMessage = function(response){
			
			angular.forEach($scope.currentConversation.messages, function(n,i){
				if(n.id == $scope.currentBotMessageId){
					$scope.currentConversation.messages[i].text = response.result.fulfillment.speech;
					setTimeout(function(){
						$scope.$apply();
					});
				}
			});
			
		}

		$scope.init();

	}

})();