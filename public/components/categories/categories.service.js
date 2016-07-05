import CrudService from '../api/crud.service';

class Categories extends CrudService {

    get path() {return 'categories';}

    getTree () {
            return this.$http.get(`${this.url}/categories/tree`)
    }
}

export default Categories;