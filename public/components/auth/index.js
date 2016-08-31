import angular from 'angular';
import loginView from './login.html';
import signUpView from './signUp.html';
import Auth from './auth.service';
import AuthLoginController from './authLogin.controller';
import AuthSignUpController from  './authSignUp.controller';
import './login.styl';

const NAME = 'auth';

function loginDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: loginView,
        controller: 'authLogin as vm',
        bindToController:true
    }
}

function signUpDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: signUpView,
        controller: 'authSignUp as vm',
        bindToController:true

    }
}

angular
    .module(NAME, [])
    
    .directive('login', loginDirective)
    .controller('authLogin', ['$scope', '$state', 'Auth', AuthLoginController])
    
    .directive('signUp', signUpDirective)
    .controller('authSignUp', ['$timeout', '$scope', '$state', 'Auth', AuthSignUpController])
    
    .service('Auth', ['$http', '$q','$rootScope', '$state',Auth])
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
    });

export default NAME;