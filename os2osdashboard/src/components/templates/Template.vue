<style>
  codemirror {
    display: block;
  }
</style>

<template>
  <div id="template" class="container">
  <h2>{{template.templateName}}</h2>
    <div class="col-lg-5">
      <div class="table-responsive">

        <table class="table table-striped">
          <tr>
            <td>UUID</td>
            <td>{{$route.params.templateUuid}}</td>
          </tr>
          <tr>
            <td>User</td>
            <td>{{template.user}}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{{template.creationDate}}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{{template.version}}</td>
          </tr>
          <tr>
            <td>Parent template</td>
            <td>
              <p v-if="template.hasParent">
                <a href='#!/templates/{{template.templateRef}}'>{{template.templateRef}}</a>
              </p>
              <p v-else>-</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-lg-5">
      <button class="btn btn-primary" v-on:click="editTemplate">Save</button>
      <!--a href='#!/dashboard'>Save and Deploy<i class='fa fa-play-circle fa-fw'></i></a><br/-->
    </div>

    <textarea rows="8" cols="50" name="codem" id="codem">
      {{template.template}}
    </textarea>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror'
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  // var endpoint = '/static/test/'

  var endpoint = 'http://10.9.240.10:8080/OSFFM/os2os/demo/'
  module.exports = {
    el () {
      return '#template'
    },
    data () {
      return {
        template: {}
      }
    },
    ready: function () {
      this.$http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:9090'
      this.$http.get(endpoint + 'templates/' + this.$route.params.templateUuid).then((response) => {
        console.error(response.data)
        var template = response.data
        template.creationDate = new Date(template.insertTimestamp)
        template.hasParent = (template.templateRef !== 'null')
        this.$set('template', template)
      }, (response) => {
        console.error('error')
      })
    },
    methods: {
      editTemplate: function () {
        console.log('SUCCESS?')
        this.$http.post(endpoint + 'templates/' + this.template.id, this.template).then((response) => {
          console.log('SUCCESS')
        })
      }
    }
  }
  window.onload = function () {
    var editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('codem'), {
      mode: 'yaml',
      theme: 'default',
      lineNumbers: true
    })
    editableCodeMirror.setSize('100%', 600)
  }

</script>
