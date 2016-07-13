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
                $scope.categories = {name:"Categories",children:res.data};
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
        this.Articles.add({title: this.article.title, text: this.article.text, tag:this.article.tags, category:this.article.category})
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