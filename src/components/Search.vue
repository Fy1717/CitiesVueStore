<template>
    <div class="col-12 justify-content-center align-items-center">
        <div class="d-flex col-md-4 mx-auto">
            <input v-model="search" class="form-control me-2" type="search" placeholder="city name.." aria-label="Search">
            <button v-on:click="setSearchState" class="btn btn-outline-success">Search</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
            }
        },
        methods: {
            setSearchState() {
                this.$store.commit('SetSearchKeyword', this.search);
                this.$store.dispatch('getListOfCities');

                console.log(this.$store.state.search)
            }
        }
    }
</script>

<style>

</style>