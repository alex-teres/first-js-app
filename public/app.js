import 'jquery';
import 'jquery-ui';
import angular from'angular';
import uiRouter from 'angular-ui-router';
import auth from  './components/auth';
import home from './components/home';
import articles from './components/articles';
import user from './components/user';

import 'nestedSortable';
import '../node_modules/bootstrap/less/bootstrap.less';
import 'bootstrap';

angular
    .module('myApp', [
        uiRouter,
        auth,
        home,
        articles,
        user
        ])
    .directive('app', function () {
        return {
            restrict: 'E',
            template: '<ui-view></ui-view>'
        }
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    })
    .run(['$state', function ($state) {
        if (!localStorage.getItem('Authorization')) {
            $state.go('login');
        }
    }])
    .service('userInterceptor', function () {
        var service = this;

        service.request = function (config) {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = localStorage.getItem('Authorization');
            }
            return config;
        };
    })
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('userInterceptor');
    }]);
