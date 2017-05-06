import angular from 'angular';
import Tags from './tags.service';
import tagsCtrl from './tags.controller';

import './tags.styl';

var NAME = 'tags';

angular.module(NAME, [])
    .service('Tags', ['$http', '$q', '$state', '$rootScope', Tags])
    .controller('tagsCtrl', ['Tags','$scope', tagsCtrl]);

export default NAME;