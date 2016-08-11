<style>
.view {
  transition: all .5s ease;
}
.test-enter, .test-leave {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}
[v-cloak] {
  display: none;
}
</style>

<template>
  <div id="app">
    <div id="wrapper">
         <navbar></navbar>

         <div id="page-wrapper">
            <div class="row">
              <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

var NavBar = Vue.extend(require('./components/NavBar.vue'))
Vue.component('navbar', NavBar)

</script>
