import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        citiesList: [],
        searchText: '',
        currentProduct: {
            id: 1,
            img: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/rome_web-30e1610428.jpg',
            temperature: '28',
            name: 'ANKARA',
            population: '288743',
            latitude: 'latitude'
        }
    },
    getters: {
        allCities: (state) => state.citiesList,
        getterSearchText: (state) => state.searchText,
        getterCurrentProduct: (state) => state.currentProduct,
    },
    actions: {
       async getListOfCities({ state, commit }) {
            var citiesListFromApi = [];
            var citiesResponse = [];
            var cityObject = {};

            await axios.get('http://api.geonames.org/citiesJSON?north=42&south=36&east=26&west=45&lang=tr&username=fy1717')
                .then(response => {
                    citiesResponse = ((response || {}).data || {}).geonames || [];
                    cityObject = {};
            
                    citiesResponse.map((city) => {
                        cityObject = {
                            id: city.geonameId || 0,
                            name: city.name || '',
                            population: city.population || 0, 
                            latitude: (city.lat || 0).toFixed(3),
                            temperature: '25',
                            img: 'https://image.arrivalguides.com/1500x600/09/aaafe2acddd3f57b18e34f8382d9721b.jpg'
                        };
                        
                        if (cityObject.name && city.name.toLowerCase().includes(state.searchText.toLowerCase())) {
                            citiesListFromApi.push(cityObject);
                            console.log(cityObject.name.toLowerCase());
                            console.log(state.searchText.toLowerCase());
                        }
                    });
            
                    console.log('ACTIONS ON STORE --> ', citiesListFromApi); 
                }).catch (error => {
                    console.log(error);
                }); 
            
            commit('SetCities', citiesListFromApi)
        } 
    },
    mutations: {
        SetCities(state, citiesListFromApi) {
            state.citiesList = citiesListFromApi
        },
        SetSearchKeyword(state, newKeyword) {
            state.searchText = newKeyword;
        }
    },
})

export default store