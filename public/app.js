(function () {
'use strict';
var myApp = angular.module('myApp', ['ui.router']);

	myApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/auth');

	$stateProvider
	.state('auth', {
		url: '/auth',
		templateUrl: 'templates/auth.html'
	})
	.state('home',{
		url:'/home',
		templateUrl:'templates/home.html'
		});

});
})();
