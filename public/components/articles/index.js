import angular from "angular";
import Articles from "./articles.service";
import Categories from "../categories";
import ArticlesCtrl from "./articles.controller";
import addArticleCtrl from "./addArticle.controller";
import articlesTpl from "./articles.html";
import addArticleTpl from "./addArticle.html";

/*import "./article.styl";*/


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
        template: addArticleTpl,
        controller: 'addArticleCtrl as vm',
        bindToController: true
    };
}


angular
    .module(NAME, [Categories])
    .directive('articles', articlesDirective)
    .controller('articlesCtrl', ['$scope', '$rootScope', 'Articles', 'User', 'Auth','$compile', ArticlesCtrl])
    .service('Articles', ['$http', '$q', '$state', '$rootScope', Articles])

    .directive('addArticle', addArticleDirective)
    .controller('addArticleCtrl', ['$scope', 'Articles', '$compile', 'Categories', addArticleCtrl])

    .config(function ($stateProvider) {
        $stateProvider
            .state('articles', {
                url: '/articles',
                template: '<articles></articles>'
            })
    });

export default NAME;