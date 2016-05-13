'use strict';
(function () {
    function authDirective() {

    }
    angular
        .module('auth', [])
        .directive('auth', authDirective)
        .config(function ($stateProvider) {
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    template: '<auth></auth>'
                })
        })
        .controller('LoginCtrl');
})();
