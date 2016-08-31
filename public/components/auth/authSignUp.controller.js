class AuthSignUp {
    constructor($timeout,$scope,$state,Auth) {
        this.Auth = Auth;
        this.$timeout = $timeout;
    }
    checkValue(value){
        if(!value){
                this.error = 'Please input all fields';
            this.$timeout(()=>{
                delete this.error
            },3000);
        }
    }
}
export default AuthSignUp