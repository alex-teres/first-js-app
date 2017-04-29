class addArticleCtrl{
   
    constructor($scope, Articles, $compile, Categories) {
        this.Articles = Articles;
        this.$scope = $scope;
        this.$compile = $compile;
            
        var select2 = $compile(('<select multiple="multiple" id="select-tags" ng-model="vm.article.tags" class="tags"></select>'))($scope);
        
        $('#select2-container').append(select2);

        this.article = {};

        select2.select2({
            placeholder: "Tags",
            tags:true,
            theme: "bootstrap",
            allowClear: true,
            width: '100%'
        });
        Categories.getTree().then(
            (res)=>{
                $scope.categories = res.data;
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
        this.Articles.add({title: this.article.title, text: this.article.text, tag:this.article.tags, category:this.article.category, color:this.article.color})
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
export default addArticleCtrl;