import angular from "angular";
import Articles from "./articles.service";
import Categories from "./categories.service";
import ArticlesCtrl from "./articles.controller";
import addArticleCtrl from "./addArticle.controller";
import articlesTpl from "./articles.html";
import addArticleView from "./addArticle.html";
import './article.styl';


const NAME = 'articles';

    function articlesDirective() {
        return {
            restrict: 'E',
            scope: {},
            template: articlesTpl,
            controller: 'articlesCtrl as vm',
            bindToController: true
        };
    }
function addArticleDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: addArticleView,
        controller: 'addArticleCtrl as vm',
        bindToController: true
    };
}

angular
    .module(NAME, [])
    .directive('articles', articlesDirective)
    .controller('articlesCtrl', ['$scope', '$rootScope', 'Articles', 'User', 'Auth', ArticlesCtrl])
    .directive('addArticle', addArticleDirective)
    .controller('addArticleCtrl', ['$scope', 'Articles', addArticleCtrl])
    .service('Articles', ['$http', '$q', '$state', '$rootScope', Articles])
    .service('Categories', ['$http', '$q', '$state', '$rootScope', Categories])

    .config(function ($stateProvider) {
        $stateProvider
            .state('articles', {
                url: '/articles',
                template: '<articles></articles>'
            })
    });

export default NAME;