<style>
@import 'http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css'
</style>


<template>
  <map></map>
</template>

<script>
import Vue from 'vue'

var Map = Vue.extend(require('./Map.vue'))
Vue.component('map', Map)
/*  export default {
  route: {
    // Check the users auth status before
    // allowing navigation to the route
    canActivate () {
      return auth.user.authenticated
    }
  }
}*/
</script>
