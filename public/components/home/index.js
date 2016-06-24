import angular from 'angular';
import HomeCtrl from './home.controller';
import homeView from './home.html';

const NAME = 'home';

    function homeDirective() {
        return {
            restrict: 'E',
            scope: {},
            template: homeView,
            controller: 'homeCtrl as vm',
            bindToController: true
        };
    }
    angular
        .module(NAME, [])
        .controller('homeCtrl', ['$scope', '$state', 'User', 'Auth', HomeCtrl])
        .directive('home', homeDirective)
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    template: '<home></home>'
                })
        });

export default NAME;