class addArticleCtrl{
    constructor($scope, Articles, $compile, Categories) {
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

        Categories.getTree().then(
            (res)=>{
                $scope.categories = {name:"Categories",children:res.data};
            },
            (err)=>{
                console.log(err);
            }
        );        

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