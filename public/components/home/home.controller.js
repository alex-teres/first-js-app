class HomeCtrl{
    constructor($scope, User, Auth, Home){

        this.Home = Home;
        User.me().then(
            function (res) {
                $scope.user = res;
                Auth.setUser(res);
                if ($scope.user.avatarUrl == undefined) {
                    $scope.user.avatarUrl = 'images/avatar.jpg'
                }
            },
            function (x) {
                $scope.errMessage = "Something wrong";
                console.log(x);
            });
    };
}
export default HomeCtrl;