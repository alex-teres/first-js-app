(function () {
    'use strict';
    function authDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/auth/auth.html',
            controller: 'LoginCtrl'
        };
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
        .controller('LoginCtrl', ['$scope', '$http',  function ($scope, $http) {

            $scope.log = function () {
                $http.post('/auth/login', {username: $scope.user.username, password: $scope.user.password})
                    .then(
                        function (r) {
                            localStorage.setItem('Authorization', $scope.token);
                            $http.get('')
                        },
                        function (x) {
                            console.log('post error');
                        }
                    )
            }
        }]);
})();