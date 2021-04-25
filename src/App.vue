<template>
  <div id="app">
    <Logo />
    <br>
    <Search />
    <br>
    <hr>
    <Cities />
  </div>
</template>

<script>
import Cities from './components/Cities.vue'
import Search from './components/Search.vue';
import Logo from './components/Logo.vue';

export default {
  name: 'App',
  components: {
    Cities,
    Search,
    Logo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
