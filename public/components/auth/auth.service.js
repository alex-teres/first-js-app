import Api from '../api/api.service';

class Auth extends Api {

    constructor($http, $q, $rootScope, $state) {
        super(arguments);
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$state = $state;
    }

    login(username, password) {
        return this.$http.post(`${this.url}/auth/login`, {username: username, password: password})
        this.$state.go('login');
    }

    signUp(params) {
        return this.$http.post(`${this.url}/users`, params)
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