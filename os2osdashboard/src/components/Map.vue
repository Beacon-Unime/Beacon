<style>
#map { height: 600px;  width: 1024px;}
</style>

<template>
<div>
  <h3>Sample Template 1</h3>
  <div id="map"></div>
</div>
</template>
<script>
import L from 'leaflet'
import AntPath from '../assets/js/leaflet-ant-path/leaflet-ant-path'

var colors = {
  'inactive': '#B6D4EA',
  'active': '#0d71bb',
  'warning': '#FF8C00'
}

export default {
  ready: function () {
    /* eslint-disable */
    this.map = new L.map('map', {inertia: false, zoomControl: false}).setView([20, 0], 2)
    /* eslint-enable */
    var layer01 = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      maxZoom: 16,
      noWrap: true
    })
    layer01.addTo(this.map)
    // Disable drag and zoom handlers.

    // this.map.dragging.disable()
    // this.map.touchZoom.disable()
    // this.map.doubleClickZoom.disable()
    // this.map.scrollWheelZoom.disable()
    this.map.keyboard.disable()

    // Disable tap handler, if present.
    if (this.map.tap) this.map.tap.disable()

    this.$http.get('/static/test/datacenters.json').then(function (response) {
      var clouds = response.data
      this.$set('clouds', clouds)
      Array.from(clouds).forEach(function (cloud) {
        cloud.marker = L.multiPolygon(getInvertedCoordinates(cloud.coordinates), {
          color: colors[cloud.start_state]
        })
        cloud.marker.addTo(this.map)
        cloud.marker.bindPopup('VM A <i class="fa fa-' + cloud.resources['A'] + ' fa-fw"></i><br>VM B <i class="fa fa-' + cloud.resources['B'] + ' fa-fw"></i>')
      }, this)

      function deploy (map, sourceCloud, destinationCloud) {
        console.info('deploy from ' + sourceCloud.name + ' to ' + destinationCloud.name)
        destinationCloud.deployment_link = new AntPath([sourceCloud.center, destinationCloud.center], {color: '#0d71bb', weight: 4})
        destinationCloud.deployment_link.addTo(map)
        window.setTimeout(function () { deployed(map, sourceCloud, destinationCloud) }, 1)
      }

      function deployed (map, sourceCloud, destinationCloud) {
        destinationCloud.marker.setStyle({color: colors['active']})
        map.removeLayer(destinationCloud.deployment_link)
        destinationCloud.deployment_link = new L.Polyline([sourceCloud.center, destinationCloud.center], {color: '#0d71bb', weight: 4})
        destinationCloud.deployment_link.addTo(map)
      }

      /* function undeploy (map, sourceCloud, destinationCloud) {
        console.info('undeploy from ' + sourceCloud.name + ' to ' + destinationCloud.name)
        destinationCloud.deployment_link.setStyle({color: colors['inactive']})
        destinationCloud.marker.setStyle({color: colors['inactive']})
        window.setTimeout(function () { undeployed(map, sourceCloud, destinationCloud) }, 5000)
      }

      function undeployed (map, sourceCloud, destinationCloud) {
        map.removeLayer(destinationCloud.deployment_link)
      }*/

      if (this.$route.params.templateUuid) {
        var api_method_path = 'http://10.9.240.10:8080/OSFFM/os2os/demo/templates/' + this.$route.params.templateUuid + '/runTime'
        this.$http.get(api_method_path).then((response) => {
          console.error(response.data)
          var template = response.data
          console.error(template.templates.Links)
          console.error(template.templates.Links.length)
          if (template.templates.Links.length > 0) {
            window.setTimeout(function () { deploy(this.map, clouds[0], clouds[1]) }.bind(this), 1)
          }
        }, (response) => {
          console.error('error')
        })
      } else {
        console.error('nope')
      }
    }, function (response) {
      // error callback
    })

    function getInvertedCoordinates (coordinates) {
      var arrayLength = coordinates.length
      for (var i = 0; i < arrayLength; i++) {
        var arrayLength1 = coordinates[i].length
        for (var j = 0; j < arrayLength1; j++) {
          var arrayLength2 = coordinates[i][j].length
          for (var k = 0; k < arrayLength2; k++) {
            coordinates[i][j][k] = coordinates[i][j][k].reverse()
          }
        }
      }
      return coordinates
    }
  }
}
</script>
