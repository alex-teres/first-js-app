import CrudService from '../api/crud.service';

class Categories extends CrudService {
    get path() {return 'categories';}
}

export default Categories;