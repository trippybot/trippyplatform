/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider
                .otherwise('/app/init/splashscreen');

            $stateProvider
                
            .state('app', {
                abstract: true,
                url: "/app",
                templateUrl: "../tpl/app.html"
            })

	            // app template
	            .state('app.init', {
	                url: '/init',
	                template: '<div class="full-height full-width" ui-view></div>'
	            })
	
		            // splashscreen
		            .state('app.init.splashscreen', {
		                url: '/splashscreen',
		                templateUrl: '../tpl/init/splashscreen.html',
		                controller: 'SplashscreenController',
		                resolve: {
		                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		                        return $ocLazyLoad.load([
		                    		'splashscreen'
		                        ]);
		                    }]
		                }
		            })
		
		            // register
		            .state('app.init.register', {
		                url: '/register',
		                templateUrl: '../tpl/init/register.html',
		                controller: 'RegisterController',
		                resolve: {
		                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		                        return $ocLazyLoad.load([
		                    		'register',
		                    		'waves'
		                        ]);
		                    }]
		                }
		            })
		            
	            // app template
	            .state('app.main', {
	                url: '/main',
	                templateUrl: '../tpl/main/layout.html'
	            })
	
		            // search
		            .state('app.main.search', {
		                url: '/search',
		                templateUrl: '../tpl/main/view/search.html',
		                controller: 'SearchController',
		                resolve: {
		                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		                        return $ocLazyLoad.load([
		                    		'search'
		                        ]);
		                    }]
		                }
		            })
		            
		            
        }
    ]);