'use strict';
import angular from 'angular';
const NAME = 'home';

    function homeDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/home/home.html',
            controller: 'homeCtrl'
        };
    }
    angular
        .module(NAME, [])
        .controller('homeCtrl', ['$scope', '$http', '$state', 'User', function ($scope, $http, $state, User) {

            User.fetch().then(
                function(res){
                    $scope.user = res;
                },
                function(x){
                    $scope.errMessage = "Something wrong";
                    console.log(x);
                }
            );

            $scope.logOut = function () {
                localStorage.removeItem('Authorization');
                $state.go('login');
            };
        }])
        .directive('home', homeDirective)
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    template: '<home></home>'
                })
        });
export default NAME;