import CrudService from '../api/crud.service';

class Articles extends CrudService {
    get path() {return 'categories';}
}

export default Articles;