class categoriesController {
    constructor($scope, Categories) {
        this.$scope = $scope;
        $scope.$on('categories:getTree', (event, categories)=> {
            $scope.categories = {name: "Categories", children: categories};
        });

        $scope.class = "hide";
        $scope.glyphClass = "glyphicon glyphicon-plus";
    }

    changeClass() {
        if (this.$scope.class == "children" && this.$scope.glyphClass == "glyphicon glyphicon-minus") {
            this.$scope.class = "hide";
            this.$scope.glyphClass = "glyphicon glyphicon-plus";
        }

        else {
            this.$scope.class = "children";
            this.$scope.glyphClass = "glyphicon glyphicon-minus";
        }
    }
}
export default categoriesController;