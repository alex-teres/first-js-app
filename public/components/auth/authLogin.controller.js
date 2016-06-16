class Login {
    constructor ($scope, $state, Auth) {
        $scope.log = function () {
            Auth.login($scope.user.username, $scope.user.password)
                .then(
                    function (res) {
                        localStorage.setItem('Authorization', res.data.token);
                        $state.go('home');
                    },
                    function (err) {
                        $scope.show = true;
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.show = false;
                            });
                        }, 3000);
                        switch (err.status) {
                            case 404:
                                $scope.errMessage = 'User not found';
                                break;
                            case 401:
                                $scope.errMessage = 'Wrong password';
                                break;
                        }

                    }
                );
        };

        /*   Auth.signUp($scope.user.username, $scope.user.password, $scope.user.email)
         .then(
         function (res) {
         console.log(res);
         },
         function (err) {
         console.log(err);
         }
         );*/
    }
}

export default Login;