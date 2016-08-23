class Api {
    get url() 
    { return ''};
    

    constructor($http, $q, $state, $rootScope) {
        this.$http = $http;
        this.$q = $q;
        this.$state = $state;
        this.$rootScope = $rootScope;
    }
}

export default Api