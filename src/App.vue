<template>
  <div id="app">
    <Cities />
  </div>
</template>

<script>
import Cities from './components/Cities.vue'

export default {
  name: 'App',
  components: {
    Cities
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
