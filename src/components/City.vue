<template>
    <img @click="$router.back()" src="../assets/back-button.svg" width="50" height="50" style="float: left; margin-left: 5%;">
    <img class="card-img-top" :src="getterCurrentCity.img" style="border-radius: 7px; margin-top: 2%"/>

    <div class="d-flex flex-wrap col-12 flex-row align-items-center justify-content-center">
        <div class="card col-xl-4 col-lg-5 col-md-6 col-6" style="border-radius: 7px; margin: 10px;">
            <div class="card-body">
                <h1>{{ getterCurrentCity.name }}</h1>
                <p class="card-text"> Population <span>{{ getterCurrentCity.population }}</span></p>
                <p class="card-text"> Temperature <span>{{ getterCurrentCity.temperature }}</span></p>
                <p class="card-text"> Latitude <span>{{ getterCurrentCity.latitude }}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            getterCurrentCity() {
                return this.$store.getters.getterCurrentCity;
            }
        },
        mounted() {
            this.$store.dispatch('setCurrentCity', this.$route.params.url);
        }
    }
</script>

<style>

</style>