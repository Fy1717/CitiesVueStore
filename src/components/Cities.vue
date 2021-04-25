<template>
  <city-component></city-component>

  <div class="container-fluid">
    <div class="d-flex flex-wrap col-12 flex-row justify-content-center align-items-center">
      <div class="card col-3" v-for="city in getterCitiesList" :key="city.id" style="border-radius: 5px; margin: 10px;">
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
  import City from './City';

  export default {
    components: {
      'city-component': City,
    },    
    data() {
      return {
        username: this.$store.state.username
      }
    },
    computed: {
      getterCitiesList() {
        return this.$store.getters.allCities;
      },
      cities() {
        return this.$store.state.citiesList;
      }
    },
    mounted() {
      this.$store.dispatch('getListOfCities');
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
