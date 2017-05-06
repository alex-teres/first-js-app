import CrudService from '../api/crud.service';

class Tags extends CrudService {
    get path() {return 'tags';}

    setTags(tags){
        this.tags = tags;
    }
    getTags(){
        return this.tags;
    }
}

export default Tags;