class Api {
    get url() { return 'http://localhost:8080'};

    constructor($http, $q, $state) {
        this.$http = $http;
        this.$q = $q;
        this.$state = $state;
    }
}

export default Api