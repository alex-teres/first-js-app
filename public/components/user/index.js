'use strict';

import angular from 'angular';
const NAME = 'user';

    angular
        .module(NAME, [])
        .factory('User', ['$http', '$q', function ($http, $q) {
            return {
                fetch: function fetch() {
                    var deferred = $q.defer();
                    $http.get('/users/me')
                        .then(
                            function (res) {
                                deferred.resolve(res.data[0]);
                            },
                            function (x) {
                                deferred.reject(x);
                            });
                    return deferred.promise;
                }/*,
                update: function update() {

                }*/
            }

        }]);

export default NAME;