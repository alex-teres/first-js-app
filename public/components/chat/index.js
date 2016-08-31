import angular from 'angular';
import chatCtrl from './chat.controller';
import chatView from './chat.html';
import Chat from './chat.service';
import Auth from '../auth/auth.service';
import './chat.styl';
import Home from '../home/home.service';


const NAME = 'chat';

function chatDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: chatView,
        controller: 'chatCtrl as vm',
        bindToController: true
    };
}
angular
    .module(NAME, [])
    .controller('chatCtrl', ['$scope', 'Chat', 'Home', 'User', 'Auth', chatCtrl])
    .directive('chat', chatDirective)
    .service('Chat', ['$http', '$q', '$state', '$rootScope', Chat])
    .config(function ($stateProvider) {
        $stateProvider
            .state('chat', {
                url: '/chat',
                template: '<chat></chat>'
            })
    });

export default NAME;