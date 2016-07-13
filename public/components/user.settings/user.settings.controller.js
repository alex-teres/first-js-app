class settingsController {
    constructor($scope, $state, User, userSettings, $timeout, Auth, FileUploader) {
        this.$state = $state;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.User = User;
        this.Auth = Auth;

        $('#crop').croppie({
            enableExif: true,
            viewport: {
                width: 50,
                height: 50,
                type: 'square'
            },
            boundary: {
                width: 200,
                height: 200
            }
        });

        User.me().then(
            (res)=> {
                $scope.user = res;
                console.log($scope.user);
                if ($scope.user.avatarUrl == undefined) {
                    $scope.user.avatarUrl = 'images/avatar.jpg'
                }
            },
            (x)=> {
                $scope.errMessage = "Something wrong";
                console.log(x);
            });

        userSettings.getCountries().then(
            (res)=> {
                var countries = res.data;
                $scope.countries = [{name: "Please select country", cities: [false]}];
                for (var i in countries) {
                    $scope.countries.push({name: i, cities: countries[i]});
                }
                $scope.selectedCountry = $scope.countries[0];
                $scope.$watch("selectedCountry", () => {
                    $scope.selectedCity = $scope.selectedCountry.cities[0];
                });
            },
            ()=> {
                console.log('Cannot get countries');
            }
        );

        $scope.uploader = new FileUploader();

        $('#upload').change(()=>{
            $('.bs-example-modal-sm').modal();
            $('#crop').croppie('bind', '');

        });


    }
    logOut() {
        localStorage.removeItem('Authorization');
        this.$state.go('login');
    };

    changePassword() {
        if (this.$scope.user.password == this.$scope.oldPassword &&
            this.$scope.password && this.$scope.rePassword &&
            this.$scope.password == this.$scope.rePassword) {

            this.User.update({password: this.$scope.password}, this.$scope.user._id).then(
                (ok)=> {
                    delete this.$scope.password;
                    delete this.$scope.rePassword;
                    delete this.$scope.oldPassword;
                    this.passwordMessage = "Password changed";
                    this.alert = "alert alert-success";
                    this.$timeout(()=> {
                        delete this.passwordMessage;
                    }, 3000)
                },
                (err)=> {
                    this.passwordMessage = "Server error";
                    this.alert = "alert alert-danger";
                    this.$timeout(()=> {
                        delete this.passwordMessage;
                    }, 3000);
                    console.log(err);
                }
            );


        }
        else {
            this.passwordMessage = "Invalid password";
            this.alert = "alert alert-danger";
            this.$timeout(()=> {
                delete this.passwordMessage;
            }, 3000)
        }

    };

    changeEmail() {
        debugger;
        this.User.update({email: this.$scope.email}, this.$scope.user._id).then(
            ()=> {
                delete this.$scope.email;
                this.emailMessage = "Email changed";
                this.alert = "alert alert-success";
                this.$timeout(()=> {
                    delete this.emailMessage;
                }, 3000)
            },
            (err)=> {
                this.emailMessage = "Server error";
                this.alert = "alert alert-danger";
                this.$timeout(()=> {
                    delete this.emailMessage;
                }, 3000);
                console.log(err);
            }
        );

    };

    changeName() {

        let serverError = ()=> {
            this.nameMessage = "Server error";
            this.alert = "alert alert-danger";
            this.$timeout(()=> {
                delete this.nameMessage;
            }, 3000);
            console.log(err);
        };
        let success = ()=> {
            this.nameMessage = "Changed";
            this.alert = "alert alert-success";
            this.$timeout(()=> {
                delete this.nameMessage;
            }, 3000);
            delete this.name;
            delete this.username;
            delete this.surName;
        };


        if (this.username && this.username !== " ") {
            this.User.update({username: this.username}, this.$scope.user._id).then(
                ()=> {
                    success();
                },
                (err)=> {
                    serverError();
                }
            );
        }
        if (this.name && this.name !== " ") {
            this.User.update({name: this.name}, this.$scope.user._id).then(
                ()=> {
                    success();
                },
                (err)=> {
                    serverError();
                }
            );

        }
        if (this.surName && this.surName !== " ") {
            this.User.update({surName: this.surName}, this.$scope.user._id).then(
                ()=> {
                    success();
                },
                (err)=> {
                    serverError();
                }
            );

        }
    };

    changeAddress() {
        if(!this.$scope.selectedCity){
            this.$scope.selectedCity = "";
        }
        if(!this.address){
            this.address = "";
        }
        if(!this.zip){
            this.zip = "";

        }
        this.User.update({address: this.$scope.selectedCountry.name + " "
        + this.$scope.selectedCity + " "
        + this.address + " "
        + this.zip}, this.$scope.user._id).then(
            ()=> {
                this.addressMessage = "Address changed";
                this.alert = "alert alert-success";
                this.$timeout(()=> {
                    delete this.addressMessage;
                }, 3000);
                this.$scope.selectedCountry = this.$scope.countries[0];
                delete this.address;
                delete this.zip;
            },
            (err)=> {

            }
        );
    };
}
export default settingsController;