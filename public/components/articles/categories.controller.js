class categoriesController{
    constructor($scope,Categories){
        
        Categories.getTree().then(
            (res)=>{
                $scope.categories = res.data;
            },
            (err)=>{
                console.log(err);
            }
        )
    }
}
export default categoriesController;