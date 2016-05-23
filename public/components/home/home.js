(function () {
    'use strict';
    function homeDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/home/home.html',
            controller: 'homeCtrl'
        };
    }
    angular
        .module('home', [])
        .directive('home', homeDirective)
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    template: '<home></home>'
                })
        })
        .controller('homeCtrl', ['$scope', '$http', '$state',  function ($scope, $http, $state) {            
            $scope.logOut = function () {
                localStorage.removeItem('Authorization');                
                $state.go('auth');
            };
            
        }]);
})();