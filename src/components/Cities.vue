<template>
  <search/>
  <br>
  <div class="container-fluid">
    <div class="d-flex flex-wrap col-12 flex-row justify-content-center align-items-center">
      <div class="card col-xl-3 col-lg-5 col-md-8" v-for="city in getterCitiesList" :key="city.id" style="border-radius: 7px; margin: 10px;">
        <router-link :to="'/city/' + city.name" style="text-decoration: none; color: black"> 
          <br>
          <img class="card-img-top" :src="city.img" style="border-radius: 7px"/>
          <h3 class="card-title"> {{ city.name }} </h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './Search.vue';
 
  export default {
    components: {
      Search
    },
    computed: {
      getterCitiesList() {
        return this.$store.getters.allCities;
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
