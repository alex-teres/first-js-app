class ArticlesCtrl{

    constructor($scope, $rootScope,  Articles, User, Auth, $compile){
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.Articles = Articles;        

        $scope.articles = [];
        
        $scope.$on('UserAuth', () => {
            Articles
                .all({owner: Auth.getUser()._id, populate:'category'})
                .then(
                    (res) => {
                        if (res.data.length == 0) {
                            $scope.message = "You don't have any articles. Try to add one by pressing this button -->";

                        }
                        else {
                            $scope.articles = res.data;
                        }
                    },
                    (err) => {
                        console.log('error on index.js ' + err);
                    }
                );
        });
        
        $scope.$on('articles:add', (event, article) => {
            $scope.articles.push(article);
            $scope.message = "";
        });

        $scope.$on('articles:delete', (event, article) => {

            let articles = $scope.articles;

            for(let i = 0; i < articles.length; i++){

                if (articles[i]._id == article._id){
                    var j = i;
                }
            }
            $scope.articles.splice(j,1);
            if ($scope.articles.length == 0){
                $scope.message = "You don't have any articles. Try to add one by pressing this button -->";
            }
        });
    }

    deleteArticle(){
        this.Articles.delete(this.article).then(
            (res) => {
                $('.modal').modal('hide');
                
            },
            (x) => {
                debugger;
            }
    );
    }

    toggleModal(article){
        this.article = article;        
        $('.bs-example-modal-sm').modal('show');
    }

}
export default ArticlesCtrl;