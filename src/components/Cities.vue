<template>
  <div class="container-fluid">
    <h1>{{username}}</h1>
    <div class="col-12 justify-content-center align-items-center">
      <form class="d-flex col-md-4">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>

    <br>

    <div class="d-flex flex-wrap col-12 flex-row justify-content-center align-items-center">
      <div class="card col-3" v-for="city in citiesList" :key="city.id" style="border-radius: 5px">
        <br>
        <img class="card-img-top" :src="city.img" style="border-radius: 5px"/>
        <h3 class="card-title"> {{ city.name }} </h3>

        <div class="card-body">
          <br>
          <p class="card-text"> Population <span>{{ city.population }}</span></p>
          <p class="card-text"> Temperature <span>{{ city.temperature }}</span></p>
          <p class="card-text"> Latitude <span>{{ city.latitude }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Cities',
  data() {
    return {
      citiesList: [],
      username: this.$store.state.username
    }
  },
  mounted() {
    axios.get('http://api.geonames.org/citiesJSON?north=42&south=36&east=26&west=45&lang=tr&username=fy1717')
      .then(response => {
        var citiesList = [];
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
          
          cityObject.name && citiesList.push(cityObject);
        });

        console.log(citiesList); 

        this.citiesList = citiesList;
    });
}
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
