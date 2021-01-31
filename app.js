// Create and set the svg elements
// var svgWidth = 960;
// var svgHeight = 700;

// var margin = {
//     top: 20,
//     right: 40,
//     bottom: 60,
//     left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// funcion to return marker size based on suicides
function SuicideMarkerSize(score) {
    return score * 10;
}
function HappinessMarkerSize(happy) {
    return happy * 10000;
}



// Define arrays to hold created country markers 
var suicideMarkers = [];
var happinessMarkers = [];




d3.csv('country_data.csv').then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        suicideMarkers.push(
            L.circle([data[i].latitude, data[i].longitude], {
                stroke: false,
                fillOpacity: 0.75,
                color: 'white',
                fillColor: 'white',
                radius: SuicideMarkerSize(data[i].total_suicides_no)
            })
        );

        happinessMarkers.push(
            L.circle([data[i].latitude, data[i].longitude], {
                stroke: false,
                fillOpacity: 0.75,
                color: 'purple',
                fillColor: 'purple',
                radius: HappinessMarkerSize(data[i].happiness_score)
            })
        );
    }
    // Streetmap Layer
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });
  
    // create seperate layer groups
    var suicides = L.layerGroup(suicideMarkers);
    var happiness = L.layerGroup(happinessMarkers);
    
    var baseMaps = {
        'Street Map': streetmap,
        'Dark Map': darkmap
    };
    
    var overlayMaps = {
        'Suicide Number': suicides,
        'Happiness Score': happiness
    };
    
    var myMap = L.map('map', {
        center: [51.4934, 0.0098],
        zoom: 2,
        layers: [streetmap, suicides, happiness]
    });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
});

// Add a tile layer (the background map image) to our map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// });


