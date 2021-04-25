import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        username: 'Furkan',
        citiesList: []
    },
    getters: {
        allCities: (state) => state.citiesList
    },
    actions: {
       getListOfCities({ commit }) {
            var citiesListFromApi = [];

            axios.get('http://api.geonames.org/citiesJSON?north=42&south=36&east=26&west=45&lang=tr&username=fy1717')
                .then(response => {
                    var citiesResponse = ((response || {}).data || {}).geonames || [];
                    var cityObject = {};
            
                    citiesResponse.map((city) => {
                        cityObject = {
                            id: city.geonameId || 0,
                            name: city.name || '',
                            population: city.population || 0, 
                            latitude: (city.lat || 0).toFixed(3),
                            temperature: '25',
                            img: 'https://image.arrivalguides.com/1500x600/09/aaafe2acddd3f57b18e34f8382d9721b.jpg'
                        };
                        
                        cityObject.name && citiesListFromApi.push(cityObject);
                    });
            
                    console.log('ACTIONS ON STORE --> ', citiesListFromApi); 
                }); 
            
            commit('SET_CITIES', citiesListFromApi)
        } 
    },
    mutations: {
        SET_CITIES(state, citiesListFromApi) {
            state.citiesList = citiesListFromApi

            console.log('MUTATIONS ON STORE --> ', state.citiesList);
        }
    }
})

export default store