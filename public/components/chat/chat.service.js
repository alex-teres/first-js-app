import Crud from '../api/crud.service';
class Chat extends Crud{
    get path() {return 'messages';}
}

export default Chat;