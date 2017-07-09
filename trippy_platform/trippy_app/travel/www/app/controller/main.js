/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables. 
 * ============================================================ */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$http', function($scope, $rootScope, $state, $http) {
    	
        // App globals
        $scope.app = {
            name: 'trippy',
            currentView: {
            	title: '',
            	id: ''
            },
            description: 'Trippy app',
            author: 'the ultimate great team',
            mainConfig: {
            },
            baseUrl: 'http://172.20.10.4:8082/paguss-ws/api/',
            headers: {
    			headers:  {
    		        'Authorization': 'Bearer 1qazxsw2'
    		    }
    		}
        }
        
        $scope.app.changeState = function(view){
        	var state = 'app.main.' + view;
        	$state.go(state);
        }
        
        $scope.getMainConfig = function(){
        	return angular.fromJson(localStorage.getItem("mainConfig"));
        }
        
        $scope.setMainConfig = function(){
        	localStorage.setItem("mainConfig", JSON.stringify($scope.app.mainConfig));
        }
        
        // Checks if the given state is the current state
        $scope.is = function(name) {
            return $state.is(name);
        }

        // Checks if the given state/child states are present
        $scope.includes = function(name) {
            return $state.includes(name);
        }

    }]);


angular.module('app')
    
    .directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    })