/**
 * Created by sasha on 22.06.16.
 */
import Api from './api.service';



class CrudService extends Api {
    all(params) {        
        return this.$http({method: 'GET', url:`${this.url}/${this.path}`, params: params})
    }
    add(items) {
        var defer = this.$q.defer();
        this.$http.post(`${this.url}/${this.path}/`, items).then(
            (res) => {
                this.$rootScope.$broadcast(`${this.path}:add`,res.data.data);
                defer.resolve(res.data.data);
            }
        );        
        return defer.promise;
    }
    delete(article) {
        var defer = this.$q.defer();
        this.$http.delete(`${this.url}/${this.path}/${article._id}`).then(
            (res) => {
                this.$rootScope.$broadcast(`${this.path}:delete`, res.data.data);
                defer.resolve(res.data.data);
            }
        );

        return defer.promise;
    }
}
export default CrudService;