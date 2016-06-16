import angular from "angular";
import User from './user.service';
const NAME = 'user';

    angular
        .module(NAME, [])
        .service('User', ['$http', '$q', User]);

export default NAME;