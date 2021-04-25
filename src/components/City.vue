<template>
    <div class="col-12 justify-content-center align-items-center position-fixed">
        <h1></h1>
    </div>
</template>

<script>
    export default {
        computed: {
            getterCurrentCity() {
                return this.$store.getters.allCities;
            }
        }
    }
</script>

<style>

</style>