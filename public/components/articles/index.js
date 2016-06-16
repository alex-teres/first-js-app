import angular from "angular";
import Articles from "./articles.service";
import ArticlesCtrl from "./articles.controller";
import addArticleCtrl from './addArticle.controller';

const NAME = 'articles';

    function articlesDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/articles/articles.html',
            controller: 'articlesCtrl'
        };
    }
function addArticleDirective() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/articles/addArticle.html',
        controller: 'addArticleCtrl'
    };
}
   angular
       .module(NAME, [])
       .directive('articles', articlesDirective)
       .directive('addArticle', addArticleDirective)
       .service('Articles', ['$http', Articles])
       .controller('articlesCtrl', ['$scope', 'Articles', ArticlesCtrl])
       .config(function ($stateProvider) {
           $stateProvider
               .state('articles', {
                   url: '/articles',
                   template: '<articles></articles>'
               })
       });

export default NAME;