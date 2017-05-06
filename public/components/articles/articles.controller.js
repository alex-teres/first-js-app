import _ from 'lodash';

class ArticlesCtrl{

    constructor($scope, $rootScope,  Articles, User, Auth, Tags, $q){
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.Articles = Articles;
        this.Tags = Tags;
        $scope.articles = [];
        Tags.all().then(
            (res)=>{
                var deferred = $q.defer();
                deferred.resolve(res.data);
                $scope.tagPromise = deferred.promise;
                this.tags = res.data;
            },
            (err)=>{
                console.log(err);
            }
        );
        this.colors = [
            {
                name: 'Grey',
                color: '#ececec'
            },
            {
                name: 'Pink',
                color: '#FFC0CB'
            },
            {
                name: 'Green',
                color: '#5effaa'
            },
        ];
        $scope.$on('UserAuth', () => {
            Articles
                .all({owner: Auth.getUser()._id, populate:'category|tag'})
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
            console.log(article);
            Articles.all({_id: article._id, populate:'category|tag'}).then(
                (res)=>{
                    console.log(res);
                    $scope.articles.push(res.data[0]);
                    $scope.message = "";
                    },
                (err)=>{console.log(err)}
            );

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
        this.article.color = $('#color').val();
        this.article.tag.forEach((tag, i, tags) => {
            if(this.tags.indexOf(tag) > -1){
                if (i == tags.length - 1) {
                    this.Articles.update( this.article, this.article._id).then(
                        () => {
                            $('.modal').modal('hide');
                            delete this.article;
                        },
                        (x) => {
                            console.log(x);
                        });
                }
            } else {
                this.Tags.add({text: tag.text}).then(
                    (res) => {
                        _.pull(this.article.tag,tag);
                        this.article.tag.push(res);
                        if (i == tags.length - 1) {
                            this.Articles.update( this.article, this.article._id).then(
                                () => {
                                    $('.modal').modal('hide');
                                    delete this.article;
                                },
                                (x) => {
                                    console.log(x);
                                });
                        }
                    }
                )
            }
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