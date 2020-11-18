//https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// Creating map object
var myMap = L.map("map", {
    center: [38, -76],
    zoom: 4
  });
  

  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Load in geojson data
  var quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
  
  var geojson;
  
  // Grab data with d3
  d3.json(quakeData, function(data) {
      var features = data["features"];
      console.log(data)
  });
  
//   {
  
    // // Create a new choropleth layer
    // geojson = L.choropleth(data, {
  
    //   // Define what  property in the features to use
    //   valueProperty: "MHI2016",
  
    //   // Set color scale
    //   scale: ["#ffffb2", "#b10026"],
  
    //   // Number of breaks in step range
    //   steps: 10,
  
    //   // q for quartile, e for equidistant, k for k-means
    //   mode: "q",
    //   style: {
    //     // Border color
    //     color: "#fff",
    //     weight: 1,
    //     fillOpacity: 0.8
    //   },
  
      // Binding a pop-up to each layer
    //   onEachFeature: function(feature, layer) {
    //     layer.bindPopup("Place: " + features.type.place + "<br>Location:<br>" +
    //       "$" + features.type.detail);
    //   }
    // }).addTo(myMap);
  
    // // Set up the legend
    // var legend = L.control({ position: "bottomright" });
    // legend.onAdd = function() {
    //   var div = L.DomUtil.create("div", "info legend");
    //   var limits = geojson.options.limits;
    //   var colors = geojson.options.colors;
    //   var labels = [];
  
    //   // Add min & max
    //   var legendInfo = "<h1>Median Income</h1>" +
    //     "<div class=\"labels\">" +
    //       "<div class=\"min\">" + limits[0] + "</div>" +
    //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    //     "</div>";
  
    //   div.innerHTML = legendInfo;
  
    //   limits.forEach(function(limit, index) {
    //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //   });
  
    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //   return div;
    // };
  
    // // Adding legend to the map
    // legend.addTo(myMap);
  
//   );
  