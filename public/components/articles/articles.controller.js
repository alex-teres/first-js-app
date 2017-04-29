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
                            $scope.message = "You don't have any articles yet. Try to add one by pressing 'Add note' button";
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
                console.log(x);
            }
    );
    }
    editArticle(){
        this.Articles.update( this.newArticle, this.article._id,).then(
            () => {
                if(this.newArticle.title){
                    this.article.title = this.newArticle.title;
                }
                if(this.newArticle.text){
                    this.article.text = this.newArticle.text;
                }
                if(this.newArticle.category){
                    this.article.category = this.newArticle.category;
                }
                if(this.newArticle.tags && this.newArticle.tags == this.article.tags){
                    debugger;
                }
                if(this.newArticle.color){
                    this.article.color = this.newArticle.color;
                }
                $('.modal').modal('hide');

            },
            (x) => {
                console.log(x);
            });
    }

    toggleModal(article, action){
        switch(action){
            case 'remove':
                $('#deleteArticle').modal('show');
                break;
            case 'edit':
                $('#editArticle').modal('show');
                break;
        }
        this.article = article;        

    }

}
export default ArticlesCtrl;