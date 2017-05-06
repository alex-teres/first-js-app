import _ from 'lodash';
class addArticleCtrl{

    constructor($scope, Articles, Categories, Tags,$q) {
        this.Articles = Articles;
        this.$scope = $scope;
        this.Tags = Tags;
        this.article = {};
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
        Categories.getTree().then(
            (res)=>{
                $scope.categories = res.data;
            },
            (err)=>{
                console.log(err);
            }
        );
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
        $scope.$on('category:select',(event,category)=>{
            this.article.category = category;
        });
    }

    addArticle() {
        this.article.color = $('#color').val();
        this.article.tags.forEach((tag, i, tags) => {
            if(this.tags.indexOf(tag) > -1){
                if (i == tags.length - 1) {
                    this.Articles.add({
                        title: this.article.title,
                        text: this.article.text,
                        tag: this.article.tags,
                        category: this.article.category,
                        color: this.article.color
                    })
                        .then(
                            (res) => {
                                delete this.article;
                                $('#color').val('#000');
                                $('.modal').modal('hide');
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
                }
            } else {
                this.Tags.add({text: tag.text}).then(
                    (res) => {
                        _.pull(this.article.tags,tag);
                        this.article.tags.push(res);
                        if (i == tags.length - 1) {
                            this.Articles.add({
                                title: this.article.title,
                                text: this.article.text,
                                tag: this.article.tags,
                                category: this.article.category,
                                color: this.article.color
                            })
                                .then(
                                    (res) => {
                                        delete this.article;
                                        $('#color').val('#000');
                                        $('.modal').modal('hide');
                                    },
                                    (err) => {
                                        console.log(err);
                                    }
                                );
                        }
                    }
                )
            }

        });
    }

}
export default addArticleCtrl;