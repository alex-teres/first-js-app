import Api from '../api/api.service';

class userSettings extends Api {

    getCountries(){
        return this.$http.get(`${this.url}/json/countriesToCities.json`);
    }

}

export default userSettings;