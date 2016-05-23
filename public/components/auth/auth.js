(function () {
    'use strict';
    function authDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/auth/auth.html',
            controller: 'authCtrl'
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
        .controller('authCtrl', ['$scope', '$http', '$state',  function ($scope, $http, $state) {
            $scope.log = function () {
                $http.post('/auth/login', {username: $scope.user.username, password: $scope.user.password})
                    .then(
                        function (res) {
                            localStorage.setItem('Authorization', res.data.token);
                            $state.go('home');
                        },
                        function (err) {
                            $scope.show = true;
                            setTimeout(function () {
                                $scope.$apply(function()
                                {
                                    $scope.show = false;
                                });
                            }, 3000);
                            switch (err.status) {
                                case 404:
                                    $scope.errMessage = 'User not found';
                                    break;
                                case 401:
                                    $scope.errMessage = 'Wrong password';
                                    break;
                            }

                        }
                    )
            }
        }]);
})();