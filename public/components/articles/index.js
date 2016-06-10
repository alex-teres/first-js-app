'use strict';
import angular from 'angular';
const NAME = 'articles';

    function articlesDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/articles/articles.html',
            controller: 'articlesCtrl'
        };
    }
   angular
        .module(NAME, [])
        .directive('articles', articlesDirective)
        .config(function ($stateProvider) {
            $stateProvider
                .state('articles', {
                    url: '/articles',
                    template: '<articles></articles>'
                })
        })
        .controller('articlesCtrl', ['$scope', '$http', '$state',  function ($scope, $http, $state) {
            $http.get('/articles/myArticles').then(
                function (res) {
                    if (res.data.length == 0){
                        $scope.message = "You don't have any articles";
                    }
                    else{
                        $scope.articles = res.data;
                    }
                },
                function (err) {
                    console.log('error on index.js ' + err );
                }
            )
        }]);

export default NAME;