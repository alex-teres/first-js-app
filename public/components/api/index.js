import angular from 'angular';
import Api from './api.service';

angular
    .module('api', [])
    .service('Api', Api);

export default 'api';
