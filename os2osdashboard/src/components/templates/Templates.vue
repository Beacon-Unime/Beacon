<style>
</style>

<template>
<div id="templates">
  <!-- example format: see /static/test/templates.json-->
  <v-server-table url="/static/test/templates.json" :options="options"></v-server-table>
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
      options: {
        columns: ['uuid', 'name', 'user', 'version', 'date', 'edit', 'status', 'deploy'],
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
