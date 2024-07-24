// Import necessary OpenLayers modules
/* import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { toLonLat, fromLonLat } from 'ol/proj'; */

var Map = ol.Map;
var View = ol.View;
var TileLayer = ol.layer.Tile;
var OSM = ol.source.OSM;
var VectorSource = ol.source.Vector;
var VectorLayer = ol.layer.Vector;
var Feature = ol.Feature;
var Point = ol.geom.Point;
var Style = ol.style.Style;
var Icon = ol.style.Icon;
var toLonLat = ol.proj.toLonLat;
var fromLonLat = ol.proj.fromLonLat;
let Text = ol.style.Text;
let Fill = ol.style.Fill;
let Stroke = ol.style.Stroke;
let geom = ol.geom;
let proj = ol.proj;

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

// Define a style with increased text size
let textSize = 16; // Initial text size
const textStyle = new Style({
  text: new Text({
    font: `bold ${textSize}px Arial`, // Use the textSize variable
    fill: new Fill({
      color: '#000'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2
    })
  })
});

// Apply the style to a feature (example feature)
const feature = new Feature({
  geometry: new Point(ol.proj.fromLonLat([0, 0])),
  name: 'Center'
});
feature.setStyle(textStyle);

// Add the feature to a vector layer
vectorSource.addFeature(feature);

// Function to update the text size in the style
function updateTextSize(newSize) {
  textStyle.getText().setFont(`bold ${newSize}px Arial`);
  vectorSource.changed(); // Refresh the vector source to apply the new style
}

// Add event listeners to the buttons
document.getElementById('increaseTextSize').addEventListener('click', function () {
  textSize += 8; // Increase text size
  updateTextSize(textSize);
});

document.getElementById('decreaseTextSize').addEventListener('click', function () {
  textSize -= 2; // Decrease text size
  updateTextSize(textSize);
});

// Add event listener to the zoom level select element
document.getElementById('zoomLevel').addEventListener('change', function () {
  const zoomLevel = parseInt(this.value, 10);
  map.getView().setZoom(zoomLevel);
});
