import Api from '../api/api.service';

class User extends Api {
    fetch() {
        var deferred = this.$q.defer();

        this.$http.get(`${this.url}/users/me`).then(
            function (res) {
                deferred.resolve(res.data[0]);
            },
            function (x) {
                deferred.reject(x);
            });

        return deferred.promise;
    }
}

export default User;