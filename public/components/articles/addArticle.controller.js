class addArticleCtrl{
    constructor($scope, Articles, $compile) {
        this.Articles = Articles;
        this.$scope = $scope;
        this.$compile = $compile;

        var select2 = $compile(('<select multiple="multiple" id="select-tags" ng-model="vm.article.tags" class="tags"></select>'))($scope);

        $('#select2-container').append(select2);


        select2.select2({
            placeholder: "Tags",
            tags:true,
            theme: "bootstrap",
            allowClear: true,
            width: '100%'
        });        

    }



    addArticle() {
        this.Articles.add({title: this.article.title, text: this.article.text, tag:this.article.tags})
            .then(
                (res) => {
                    $('.modal').modal('hide');
                },
                (err) => {
                    console.log(err);
                }
            );


    }

}
export default addArticleCtrl;