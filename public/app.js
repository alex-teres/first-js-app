import 'jquery';
import 'jquery-ui';
import angular from'angular';
import uiRouter from 'angular-ui-router';
import auth from  './components/auth';
import home from './components/home';
import articles from './components/articles';
import user from './components/user';
import userSettings from './components/user.settings';
import chat from './components/chat';
import pdf from './components/pdf';
import '../node_modules/select2/dist/js/select2.full.min';
import '../node_modules/select2/dist/css/select2.min.css';
import '../node_modules/bootstrap/less/bootstrap.less';
import 'bootstrap';
import '../node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css';
import 'croppie';
import '../node_modules/croppie/croppie.css';
// import 'nestedSortable';

angular
    .module('myApp', [
        uiRouter,
        auth,
        home,
        articles,
        user,
        userSettings,
        chat,
        pdf
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
