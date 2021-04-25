<template>
    <img src="../assets/backbutton.png" class="position-fixed" width="50" height="50" style="float: left; margin-left: 5%; margin-top: 2%">

    <img class="card-img-top" :src="getterCurrentCity.img" style="border-radius: 7px"/>

    <div class="d-flex flex-wrap col-12 flex-row align-items-center justify-content-center">
        <div class="card col-3" style="border-radius: 7px; margin: 10px;">
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
                return this.$store.getters.getterCurrentProduct;
            }
        }
    }
</script>

<style>

</style>