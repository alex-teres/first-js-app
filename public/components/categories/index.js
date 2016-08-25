import angular from 'angular';
import Categories from './categories.service';
import categoriesCtrl from './categories.controller';
import categoryTpl from './category.html';

import './category.styl';

var NAME = 'categories';

function categoryDirective(RecursionHelper) {
    return{
        restrict: 'E',
        scope: { family: '=' },
        template: categoryTpl,
        controller:'categoriesCtrl as vm',
        bindToController: true,
        compile: function(element) {
            return RecursionHelper.compile(element);
        }
    }
}

angular.module(NAME, [])
    .directive(NAME, ['RecursionHelper', categoryDirective])
    .service('Categories', ['$http', '$q', '$state', '$rootScope', Categories])
    .controller('categoriesCtrl', ['$scope', 'Categories', categoriesCtrl])
    .factory('RecursionHelper', ['$compile', ($compile)=>{
        return {

            compile: (element, link)=>{

                if(angular.isFunction(link)){
                    link = { post: link };
                }

                var contents = element.contents().remove();
                var compiledContents;

                return {
                    pre: (link && link.pre) ? link.pre : null,
                    post: (scope, element)=>{
                        if(!compiledContents){
                            compiledContents = $compile(contents);
                        }
                        compiledContents(scope, (clone)=>{
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