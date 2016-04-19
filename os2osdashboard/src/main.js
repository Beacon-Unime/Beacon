import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { configRouter } from './route-config'

Vue.use(VueRouter)
Vue.use(VueResource)

// Create a router instance.
const router = new VueRouter({
})
configRouter(router)

const App = Vue.extend(require('./App.vue'))

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
