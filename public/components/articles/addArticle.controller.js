class addArticleCtrl{
    constructor($scope, Articles, Categories, $compile) {
        this.Articles = Articles;
        this.$scope = $scope;
        this.Categories = Categories;
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


  /*      Categories.all({populate: 'children'}).then(
            (res) => {
                console.log(res.data);
                this.takeCategories = ()=> {
                    for (let i; i < categories.length; i++) {
                        $scope.name = categories[i].name;
                        $scope.childName = '';
                    }
                };
            },
            (err) => {
                console.log('error on index.js ' + err);
            }
        );*/

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