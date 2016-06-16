import angular from 'angular';
import HomeCtrl from './home.controller';

const NAME = 'home';

    function homeDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/home/home.html',
            controller: 'homeCtrl as vm',
            bindToController: true
        };
    }
    angular
        .module(NAME, [])
        .controller('homeCtrl', ['$scope', '$state', 'User', HomeCtrl])
        .directive('home', homeDirective)
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    template: '<home></home>'
                })
        });

export default NAME;