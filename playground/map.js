var map = new L.map('map', {inertia: false, zoomControl: false}).setView([20, 0], 2);
var layer01 = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    maxZoom: 16,
    noWrap: true
}).addTo(map);
// Disable drag and zoom handlers.
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.keyboard.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();
var clouds = [
    {
        "id": 1,
        "coordinates": [41, 12],
        "start_state": "active"
    },
    {
        "id": 2,
        "coordinates": [28, 77],
        "start_state": "inactive"
    },
    {
        "id": 3,
        "coordinates": [39, 116],
        "start_state": "inactive"
    }
];

var colors = {
    "inactive": "#B6D4EA",
    "active": "#0d71bb"
};

clouds.map(function (cloud) {
    cloud.marker = L.circle(cloud.coordinates, 500000, {
        color: colors[cloud.start_state]
    });
    cloud.marker.addTo(map);
});

function deploy(sourceCloud, destinationCloud) {
    destinationCloud.deployment_link = new L.Polyline.AntPath([sourceCloud.coordinates, destinationCloud.coordinates], {color: '#0d71bb', weight: 4});
    destinationCloud.deployment_link.addTo(map);
    //window.setTimeout(function(){deployed(sourceCloud, destinationCloud);}, 5000);
}

function deployed(sourceCloud, destinationCloud){
    destinationCloud.marker.setStyle({color: colors['active']});
    map.removeLayer(destinationCloud.deployment_link);
    destinationCloud.deployment_link = new L.Polyline([sourceCloud.coordinates, destinationCloud.coordinates], {color: '#0d71bb', weight: 4});
    destinationCloud.deployment_link.addTo(map);
}

function undeploy(sourceCloud, destinationCloud) {
    destinationCloud.deployment_link.setStyle({color: colors['inactive']});
    destinationCloud.marker.setStyle({color: colors['inactive']});
    window.setTimeout(function(){undeployed(sourceCloud, destinationCloud);}, 5000);

}
function undeployed(sourceCloud, destinationCloud) {
    map.removeLayer(destinationCloud.deployment_link);
}

function start() {
    // ?GET /application/<app_uuid> returns list of clouds it is deployed on
    // ?GET /clouds/<cloud_uuid> returns list of clouds
    window.setTimeout(function(){deploy(clouds[0], clouds[1]);}, 5000);
    window.setTimeout(function(){deploy(clouds[0], clouds[2]);}, 10000);
    window.setTimeout(function(){undeploy(clouds[0], clouds[1]);}, 15000);
}
start();
