class addArticleCtrl{
    constructor($scope, Articles){
        this.Articles = Articles;
        this.$scope = $scope;

/*        $('.sortable').nestedSortable({
            handle: 'div',
            items: 'li',
            toleranceElement: '> div',
            isTree: true
        });*/
    }



    addArticle() {
        this.Articles.add({title: this.article.title, text: this.article.text})
            .then(
                (res) => {
                    $('.modal').modal('hide');
                },
                (err) => {

                }
            );


    }

}
export default addArticleCtrl;