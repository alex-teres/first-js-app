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
    }
}

export default Login;