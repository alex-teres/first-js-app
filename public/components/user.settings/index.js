import angular from 'angular';
import userSettingsCtrl from './user.settings.controller';
import userSettingsView from './user.settings.html';
import './user.settings.styl';
import userSettings from './user.settings.service';
import User from '../user/user.service';
import 'angular-file-upload';

const NAME = 'settings';

function userSettingsDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: userSettingsView,
        controller: 'settingsCtrl as vm',
        bindToController: true
    };
}

angular
    .module(NAME, ['angularFileUpload'])
    .controller('settingsCtrl', ['$scope', '$state', 'User', 'userSettings', '$timeout', 'Auth', 'FileUploader','$element', userSettingsCtrl])
    .directive('settings', userSettingsDirective)
    .service('userSettings', ['$http', 'User', userSettings])
    .config(function ($stateProvider) {
        $stateProvider
            .state('settings', {
                url: '/settings',
                template: '<settings></settings>'
            })
    });

export default NAME;
