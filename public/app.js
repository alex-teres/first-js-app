(function () {
'use strict';
	angular
		.module('myApp', ['ui.router', 'auth', 'home'])
		.config(function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/home');
		})
		.run(['$state',  function ($state) {
			if(!localStorage.getItem('Authorization')){
				$state.go('auth');
			}
		}]);
})();
