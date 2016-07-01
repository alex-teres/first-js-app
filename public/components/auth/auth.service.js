import Api from '../api/api.service';

class Auth extends Api {

    constructor($http, $q, $rootScope) {
        super(arguments);
        this.$rootScope = $rootScope;
        this.$http = $http;
    }

    login(username, password) {
        return this.$http.post(`${this.url}/auth/login`, {username: username, password: password})
    }

    signUp(username, password, email) {
        return this.$http.post(`${this.url}/users`, {username: username, password: password, email: email})
    }

    setUser(user) {
        this.user = user;
        this.$rootScope.$broadcast('UserAuth', user);
    }

    getUser() {
        return this.user;
    }
}

export default Auth;