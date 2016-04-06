'use strict';

angular.module('myApp', ['ui.router','ngMaterial']).config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	
	$stateProvider.state('app', {
		url: '/',
		templateUrl: 'app/app.html',
		controller: 'AppCtrl'
	});
	
}).run(function () {
	
}); 