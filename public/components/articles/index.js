import angular from "angular";
import Articles from "./articles.service";
import Categories from "./categories.service";
import ArticlesCtrl from "./articles.controller";
import addArticleCtrl from "./addArticle.controller";
import articlesTpl from "./articles.html";
import addArticleTpl from "./addArticle.html";
import categoryTpl from './category.html';
import categoriesCtrl from './categories.controller';

import "./article.styl";


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
function categoryDirective(RecursionHelper) {
    return{
        restrict: 'E',
        scope: {children: '='},
        template: categoryTpl,
        controller:'categoriesCtrl as vm',
        bindToController: true,
        compile: function(element) {
            return RecursionHelper.compile(element);
        }
    }
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
    .module(NAME, [])
    .directive('articles', articlesDirective)
    .controller('articlesCtrl', ['$scope', '$rootScope', 'Articles', 'User', 'Auth','$compile', ArticlesCtrl])
    .service('Articles', ['$http', '$q', '$state', '$rootScope', Articles])

    .directive('addArticle', addArticleDirective)
    .controller('addArticleCtrl', ['$scope', 'Articles', '$compile', addArticleCtrl])

    .directive('categories',['RecursionHelper', categoryDirective])
    .service('Categories', ['$http', '$q', '$state', '$rootScope', Categories])
    .controller('categoriesCtrl', ['$scope', 'Categories', categoriesCtrl])

    .config(function ($stateProvider) {
        $stateProvider
            .state('articles', {
                url: '/articles',
                template: '<articles></articles>'
            })
    })
    .factory('RecursionHelper', ['$compile', function($compile){
        return {

            compile: function(element, link){

                if(angular.isFunction(link)){
                    link = { post: link };
                }

                var contents = element.contents().remove();
                var compiledContents;

                return {
                    pre: (link && link.pre) ? link.pre : null,
                    post: function(scope, element){
                        if(!compiledContents){
                            compiledContents = $compile(contents);
                        }
                        compiledContents(scope, function(clone){
                            element.append(clone);
                        });

                        if(link && link.post){
                            link.post.apply(null, arguments);
                        }
                    }
                };
            }
        };
    }]);

export default NAME;