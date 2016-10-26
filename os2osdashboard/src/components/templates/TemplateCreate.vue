<style>
  codemirror {
    display: block;
  }
</style>

<template>
  <div id="template" class="container">
    <h2>Create a new template</h2>
    <div class="col-lg-5">
      <div class="table-responsive">

        <table class="table table-striped">
          <tr>
            <td>Template name</td>
            <td>
              <input type="text" placeholder="Enter template name" v-model="template.name" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-lg-5">
      <button class="btn btn-primary" v-on:click="createTemplate">Save</button>
    </div>

    <textarea rows="50" cols="100" v-model="template.content">
    </textarea>
  </div>
</template>

<script>
  // import CodeMirror from 'codemirror'
  import Vue from 'vue'
  import VueResource from 'vue-resource'

  Vue.use(VueResource)

  var endpoint = 'http://10.9.240.10:8080/OSFFM/os2os/notrhBr/manifest/demo/'
  var username = window.localStorage.getItem('un')
  var req = {
    'user': username,
    'templateName': 'changeme',
    'templateRef': 'null',
    'templates': 'changeme'
  }

  module.exports = {
    el () {
      return '#template'
    },
    data () {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        template: {
          name: '',
          content: ''
        },
        ecm: '',
        error: ''
      }
    },
    /* ready: function () {
       this.ecm = CodeMirror.fromTextArea(document.getElementById('codem'), {
        mode: 'yaml',
        theme: 'default',
        lineNumbers: true
      })
      this.ecm.setSize('100%', 600)
    }, */
    methods: {
      createTemplate: function () {
        req.templateName = this.template.name
        req.templates = this.template.content
        console.error(req)
        this.$http.post(endpoint + 'templates/', req).then((response) => {
          console.log('SUCCESS')
        }, (response) => {
          window.alert('Access not authorised')
          console.error(response)
        })
      }
    }
  }

</script>
