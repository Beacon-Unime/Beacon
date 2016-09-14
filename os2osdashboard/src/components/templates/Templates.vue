<style>
</style>

<template>
<div id="templates">
  <!-- example format: see /static/test/templates.json-->
  <!-- http://10.9.240.10:8080/OSFFM/os2os/beacon/templates/ -->
  <v-server-table url="http://10.9.240.10:8080/OSFFM/os2os/beacon/templates/" :columns="columns" :options="options"></v-server-table>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTables from 'vue-tables'
Vue.use(VueResource)
Vue.use(VueTables.server)

module.exports = {
  el () { return '#templates' },
  data () {
    return {
      columns: ['uuid', 'name', 'user', 'version', 'date', 'edit', 'status', 'deploy'],
      options: {
        templates: {
          edit: "<a href='#!/templates/{uuid}/edit'><i class='fa fa-edit fa-fw'></i></a>",
          status: "<a href='#!/templates/{uuid}/map'><i class='fa fa-globe fa-fw'></i></a>",
          deploy: "<a href='#!/templates/{uuid}/deploy'><i class='fa fa-play-circle fa-fw'></i></a>"
        }
      }
    }
  }
}
</script>
