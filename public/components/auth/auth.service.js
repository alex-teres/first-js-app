import Api from '../api/api.service';

class Auth extends Api {
    login(username, password) {
        return this.$http.post(`${this.url}/auth/login`, {username: username, password: password})
    }
    signUp(username, password, email) {
        return this.$http.post(`${this.url}/users`, {username: username, password: password, email: email})
    }
}

export default Auth;