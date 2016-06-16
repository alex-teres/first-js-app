class HomeCtrl{
    constructor($scope, $state, User){

        this.$state = $state;

        User.fetch().then(
            function (res) {
                $scope.user = res;
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