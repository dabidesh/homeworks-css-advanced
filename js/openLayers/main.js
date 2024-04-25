// Import necessary OpenLayers modules
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { toLonLat, fromLonLat } from 'ol/proj';

// Initialize map
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 4
  })
});

// Create a vector source and add it to the map as a layer
const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source: vectorSource
});
map.addLayer(vectorLayer);

// Get input elements
const lonInput = document.getElementById('longitude');
const latInput = document.getElementById('latitude');
const altInput = document.getElementById('altitude');

// Add click event listener to map
map.on('click', function (event) {
  // Get clicked coordinate and transform it to longitude and latitude
  const lonLat = toLonLat(event.coordinate);

  // Update inputs
  lonInput.value = lonLat[0];
  latInput.value = lonLat[1];

  // TODO: Get altitude of clicked location and update altitude input
  // altInput.value = getAltitude(lonLat[0], lonLat[1]);
});

function updateMapCenter(lon, lat) {
  // Convert longitude and latitude to a coordinate
  const coordinate = fromLonLat([lon, lat]);

  // Set map center to the coordinate
  map.getView().setCenter(coordinate);
}

updateButton.onclick = () => updateMapCenter(longitude.value, latitude.value);
