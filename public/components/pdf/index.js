import angular from 'angular';
import pdfCtrl from './pdf.controller';
import pdfView from './pdf.html';


const NAME = 'pdf';

function pdfDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: pdfView,
        controller: 'pdfCtrl as vm',
        bindToController: true
    };
}
angular
    .module(NAME, [])
    .controller('pdfCtrl', ['$scope', 'Home', 'User', 'Auth', pdfCtrl])
    .directive('pdf', pdfDirective)
    .config(function ($stateProvider) {
        $stateProvider
            .state('pdf', {
                url: '/pdf',
                template: '<pdf></pdf>'
            })
    });

export default NAME;