(function () {
    'use strict';
    function authDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'home.html'
        };
    }
    angular
        .module('home', [])
        .directive('home', authDirective)
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    template: '<home></home>'
                })
        })
        .controller();
})();