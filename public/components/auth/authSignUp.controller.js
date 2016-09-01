class AuthSignUp {
    constructor($timeout,$scope,$state,Auth) {
        this.Auth = Auth;
        this.$timeout = $timeout;
        this.$state = $state;
    }
    checkValue(value){
        if(!value){
                this.error = 'Please input all fields';
            this.$timeout(()=>{
                delete this.error
            },3000);
        }
    }
    signUp(username, password, email){
        console.log(username, password, email);
        this.Auth.signUp({username:username,password:password,email:email}).then(
            (res)=>{
                this.message = "Register done";
                this.$timeout(()=>{
                    delete this.message;
                    this.$state.go('login');
                },2000);
            },
            (err)=>{
                console.log(err);
                this.error = err.statusText + '. ' + 'Try a bit later';
                this.$timeout(()=>{
                    delete this.error;
                    this.$state.go('login');
                },3000);
            }
        );
    }
}
export default AuthSignUp