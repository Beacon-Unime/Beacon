<style>
</style>

<template>
<div id="templates">
  <!-- example format: see /static/test/templates.json-->
  <!-- http://10.9.240.10:8080/OSFFM/os2os/demo/templates/ -->
  <v-server-table url="http://10.9.240.10:8080/OSFFM/os2os/demo/templates/" :columns="columns" :options="options"></v-server-table>
</div>

<a href='#!/templates/create'>Create template<i class='fa fa-play-circle fa-fw'></i></a>

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
        filterable: false,
        pagination: {
          dropdown: false
        },
        templates: {
          edit: function (row) {
            return "<a href='#!/templates/" + row.id + "/edit'><i class='fa fa-edit fa-fw'></i></a>"
          },
          status: function (row) {
            return "<a href='#!/dashboard/" + row.id + "'><i class='fa fa-globe fa-fw'></i></a>"
          },
          deploy: function (row) {
            return "<a href='#!/templates/" + row.id + "/deploy'><i class='fa fa-play-circle fa-fw'></i></a>"
          }
        }
      }
    }
  }
}
import auth from '../../auth'
console.error(auth.user)
</script>
