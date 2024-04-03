// Map inizialize and size
var map = L.map("map").setView([55.7, 12.6], 10);
 
// Will add a base map to it
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
 
// Loads the shipwrecks GeoJSON data file from GitHub trough the link
fetch("https://raw.githubusercontent.com/SaschaCaia/Assignment-3/main/shipwrecks.geojson")
  .then((response) => response.json())
  .then((shipwrecksData) => {
    console.log("GeoJSON Data:", shipwrecksData);
 
    // Will create shipwrecks layer with customs popup and markers styles
    var shipwrecksLayer = L.geoJSON(shipwrecksData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Era: " + feature.properties.datering);
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 7,
          fillColor: "black",
          color: "#000",
          weight: 1,
          opacity: 2,
          fillOpacity: 0.9,
        });
      },
    });
 
    // This creates an marker clustergroup for the shipwrecks, in a chosen color of green.
    var shipwrecksCluster = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html: '<div style="background-color: green; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">' + cluster.getChildCount() + '</div>',
          className: 'shipwrecks-cluster-icon',
          iconSize: [30, 30]
        });
      }
    });
    shipwrecksCluster.addLayer(shipwrecksLayer);
 
    // Add shipwrecks layer to the map
    map.addLayer(shipwrecksCluster);
 
    // Fits the map bounds to the shipwrecks layer
    map.fitBounds(shipwrecksLayer.getBounds());
  })
  .catch((error) => {
    console.error("Error loading GeoJSON data:", error.message);
  });