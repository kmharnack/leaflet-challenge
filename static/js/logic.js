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
  var quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
  var geojson;
  
  function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

  // Grab data with d3
  d3.json(quakeData, function(response) {
    console.log(response);
    var features = response["features"];
    for (var i = 0; i < features.length; i++) {
    var lat = features[i]["geometry"]["coordinates"][1];
    var long = features[i]["geometry"]["coordinates"][0];
    var mag = features[i]["properties"]["mag"];
    var depth = features[i]["geometry"]["coordinates"][2];
    var title = features[i]["properties"]["title"];
    var place = features[i]["properties"]["place"];
    //add fill color, change colors and add description to the legend     
        // console.log(features[i])
        console.log(title)
        L.circleMarker([lat,long], {radius: Math.pow(mag, 3)/10, color: getColor(depth) })
          .bindPopup(title).bindPopup(place).addTo(myMap);
                
        }
    });

  // Set up the legend
  var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<hr>' : '+');
    }

    return div;
};

legend.addTo(myMap);
   

   
