class HomeCtrl{
    constructor($scope, $state, User, Auth){

        this.$state = $state;

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
    
    logOut (){
        localStorage.removeItem('Authorization');
        this.$state.go('login');
    };



}
export default HomeCtrl;