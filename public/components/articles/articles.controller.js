class ArticlesCtrl{
    constructor($scope,  Articles){
        Articles.articles().then(
            function (res) {
                if (res.data.length == 0){
                    $scope.message = "You don't have any articles";
                }
                else{
                    $scope.articles = res.data;
                }
            },
            function (err) {
                console.log('error on index.js ' + err );
            })
    }
}
export default ArticlesCtrl;