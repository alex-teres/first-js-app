import 'jquery';
import 'jquery-ui';
import angular from'angular';
import uiRouter from 'angular-ui-router';
import auth from  './components/auth';
import home from './components/home';
import articles from './components/articles';
import tags from './components/tags';
import user from './components/user';
import userSettings from './components/user.settings';
import chat from './components/chat';
import pdf from './components/pdf';
import '../node_modules/bootstrap/less/bootstrap.less';
import 'bootstrap';
import '../node_modules/ng-tags-input/build/ng-tags-input.min';
import '../node_modules/ng-tags-input/build/ng-tags-input.min.css';
import '../node_modules/ng-tags-input/build/ng-tags-input.bootstrap.min.css';
import 'croppie';
import '../node_modules/croppie/croppie.css';
// import 'nestedSortable';

angular
    .module('myApp', [
        uiRouter,
        auth,
        home,
        tags,
        articles,
        user,
        userSettings,
        chat,
        pdf,
        'ngTagsInput'
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
