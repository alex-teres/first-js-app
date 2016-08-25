class Api {
    get url() 
    { return __dirname};
    

    constructor($http, $q, $state, $rootScope) {
        this.$http = $http;
        this.$q = $q;
        this.$state = $state;
        this.$rootScope = $rootScope;
    }
}

export default Api