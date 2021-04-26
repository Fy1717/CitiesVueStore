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

            async function getSecondRequest(urlForImage, cityObject) {
                try {
                    var responseCity = await axios.get(urlForImage);

                    if (responseCity.status === 200) {
                        cityObject.img = ((((responseCity.data || {}).photos || [])[0] || {}).image || {}).web || '';
                        citiesListFromApi.push(cityObject);
                        commit('SetAddCity', cityObject);
                    }
                } catch (err2) {
                    commit('SetAddCity', cityObject);
                    console.log(err2);
                }
            }

            try {
                var response = await axios.get(state.allCitiesApiUrl);
            
                citiesResponse = ((response || {}).data || {}).geonames || [];
                    cityObject = {};
            
                    citiesResponse.map(city => {
                        cityObject = {
                            id: city.geonameId || 0,
                            name: city.name || '',
                            population: city.population || 0, 
                            latitude: (city.lat || 0).toFixed(3),
                            temperature: '25',
                            img: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/baku_web-71bcbddb43.jpg'
                        };
                        
                        if (cityObject.name) {
                            var urlForImage = 'https://api.teleport.org/api/urban_areas/slug:' + city.name.toLowerCase() + '/images/';
                            
                            getSecondRequest(urlForImage, cityObject);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        }, 
        async setCurrentCity({ state, commit }, urlCityName) {
            if(!urlCityName) {
                urlCityName = window.location.pathname.split('/').slice(-1)[0];
            }

            state.citiesList.map(city => {
                if (city.name === urlCityName) {
                    var urlForImage = 'https://api.teleport.org/api/urban_areas/slug:' + city.name.toLowerCase() + '/images/';
                    
                    try {
                        axios.get(urlForImage)
                            .then(responseCity => {
                                if(responseCity.status === 200) {
                                    city.img = ((((responseCity.data || {}).photos || [])[0] || {}).image || {}).web || city.img;
                                }
                            }). catch(errorForImage => {
                                console.warn(errorForImage);
                            });

                        commit('SetCity', city);
                    } catch (err3) {
                        console.log(err3);
                    }
                    
                }
            });
        }
    },
    mutations: {
        SetCities(state, citiesListFromSearch) {            
            state.citiesList = citiesListFromSearch;
        },
        SetSearchKeyword(state, newKeyword) {
            state.searchText = newKeyword;
        },
        SetCity(state, newCity) {
            state.currentCity = newCity;
        },
        SetAddCity(state, addingCity) {
            var existsControl = true;
            var searchedList = [];

            state.citiesList.map(city => {
                if (addingCity.name === city.name) {
                    existsControl = false;
                }  
            });

            if (existsControl) {
                state.citiesList.push(addingCity);
            }

            state.citiesList.map(city => {
                if (city.name.toLowerCase().includes(state.searchText.toLowerCase())) {
                    searchedList.push(city);
                }  
            });

            state.citiesList = searchedList;
        }
    },
})

export default store