'use strict';
import angular from 'angular';
const NAME = 'auth';
import loginView from './login.html';
import signUpView from './signUp.html';
require('./login.styl');

function loginDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: loginView,
        controller: 'authCtrl'
    }
}

function signUpDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: signUpView,
        controller: 'authCtrl'
    }
}

angular
    .module(NAME, [])
    .directive('login', loginDirective)
    .directive('signUp', signUpDirective)
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'
            })
            .state('signUp', {
                url: '/signUp',
                template: '<sign-up></sign-up>'
            })
    })
    .controller('authCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
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
                            $scope.$apply(function () {
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
                );

        };
        $scope.signUp = function () {


            $http.post('/users', {
                username: $scope.user.username,
                password: $scope.user.password,
                email: $scope.user.email
            })
                .then(
                    function (res) {

                    },
                    function (err) {

                    }
                )
        };
    }]);

export default NAME;