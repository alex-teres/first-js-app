(function () {
'use strict';
	angular
		.module('myApp', ['ui.router', 'auth', 'home'])
		.config(function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/auth');
		})
})();
