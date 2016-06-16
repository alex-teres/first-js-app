import Api from '../api/api.service';

class Articles extends Api {
    articles() {
        return this.$http.get(`${this.url}/articles/myArticles`)
    }
}

export default Articles;