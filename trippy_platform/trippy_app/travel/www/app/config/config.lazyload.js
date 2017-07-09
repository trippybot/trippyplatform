/* ============================================================
 * File: config.lazyload.js
 * Configure modules for ocLazyLoader. These are grouped by 
 * vendor libraries. 
 * ============================================================ */

angular.module('app')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [{
                name: 'splashscreen',
                files: [
                	 '../app/controller/init/splashscreen.controller.js'
                ]
            },{
                name: 'register',
                files: [
                	 '../assets/js/controller/register.controller.js'
                ]
            },{
                name: 'dashboard',
                files: [
                	 '../assets/js/controller/dashboard.controller.js'
                ]
            },{
                name: 'search',
                files: [
                	 '../assets/js/controller/search.controller.js'
                ]
            },{
                name: 'oportunities',
                files: [
                	 '../assets/js/controller/oportunities.controller.js'
                ]
            },{
                name: 'chat',
                files: [
                	 '../assets/js/controller/chat.controller.js'
                ]
            },{
                name: 'configuration',
                files: [
                	 '../assets/js/controller/configuration.controller.js'
                ]
            },{
                name: 'bcSwipe',
                files: [
                	 '../assets/plugins/bcSwipe/jquery.bcSwipe.js'
                ],
                serie: true
            },{
                name: 'waves',
                files: [
	               	 '../assets/plugins/waves/dist/waves.min.js',
	               	 '../assets/plugins/waves/dist/waves.min.css'
                ],
                serie: true
            },{
                name: 'floating-label',
                files: [
	               	 '../assets/plugins/bootstrap-float-label/dist/bootstrap-float-label.min.css'
                ]            
            }]
        });
    }]);