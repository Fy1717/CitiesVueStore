import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        citiesList: [],
        searchText: '',
        allCitiesApiUrl: 'http://api.geonames.org/citiesJSON?north=42&south=36&east=26&west=45&lang=en&username=fy1717',
        currentCity: {
            id: 1,
            img: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/rome_web-30e1610428.jpg',
            temperature: 'default',
            name: 'default',
            population: 'default',
            latitude: 'default'
        }
    },
    getters: {
        allCities: (state) => state.citiesList,
        getterSearchText: (state) => state.searchText,
        getterCurrentCity: (state) => state.currentCity,
    },
    actions: {
        async getListOfCities({ state, commit }) {
            var citiesListFromApi = [];
            var citiesResponse = [];
            var cityObject = {};

            await axios.get(state.allCitiesApiUrl)
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
                            var urlForImage = 'https://api.teleport.org/api/urban_areas/slug:' + city.name.toLowerCase() + '/images/';
                            
                            axios.get(urlForImage)
                                .then(responseCity => {
                                    if(responseCity.status === 200) {
                                        cityObject.img = ((((responseCity.data || {}).photos || [])[0] || {}).image || {}).web || cityObject.img;
                                        //console.log(cityObject.img)
                                    }
                                }). catch(errorForImage => {
                                    console.warn(errorForImage);
                                });

                            citiesListFromApi.push(cityObject);
                        }
                    });
            
                    //console.log('ACTIONS ON STORE --> ', citiesListFromApi); 
                }).catch (error => {
                    console.log(error);
                }); 
            
            commit('SetCities', citiesListFromApi)
        }, 
        async setCurrentCity({ state, commit }, urlCityName) {
            if(!urlCityName) {
                urlCityName = window.location.pathname.split('/').slice(-1)[0];
            }

            state.citiesList.map((city) => {
                if (city.name === urlCityName) {
                    var urlForImage = 'https://api.teleport.org/api/urban_areas/slug:' + city.name.toLowerCase() + '/images/';
                    
                    axios.get(urlForImage)
                        .then(responseCity => {
                            if(responseCity.status === 200) {
                                city.img = ((((responseCity.data || {}).photos || [])[0] || {}).image || {}).web || city.img;
                                //console.log(city.img);
                            }
                        }). catch(errorForImage => {
                            console.warn(errorForImage);
                        });

                    commit('SetCity', city);

                    //console.log('new city --> ', city);
                }
            });
        } 
    },
    mutations: {
        SetCities(state, citiesListFromApi) {
            state.citiesList = citiesListFromApi;
        },
        SetSearchKeyword(state, newKeyword) {
            state.searchText = newKeyword;
        },
        SetCity(state, newCity) {
            state.currentCity = newCity;
        }
    },
})

export default store