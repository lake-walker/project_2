// Map creation

// Outlines for every country
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 3
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

d3.json('countries.geojson').then(function (data) {
    d3.csv('country_data.csv').then(function (csv) {
      var world = data.features;
      console.log(world[39].properties.ADMIN);
      console.log(csv);
      csv.forEach(function(d, i) {
        world.forEach(function(e, j) {
          if (e.properties.ADMIN === d.country) {
            e.properties.sui_per_100k_2015 = +d.sui_per_100k_2015,
            e.properties.human_development_index = +d.human_development_index,
            e.properties.economy_gdp_per_capita_2015 = +d.economy_gdp_per_capita_2015,
            e.properties.happiness_score_2015 = +d.happiness_score_2015
          }
          // else {
          //   e.properties.sui_per_100k_2015 = 'N/A'
          // }
        })
      })
      console.log(data);
      var sui_map = L.geoJson(data, {
        style: function(feature) {
          return {
            color: 'white',
            fillColor: getColor(feature.properties.sui_per_100k_2015)
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.5
              });
            },
            click: function(event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          layer.bindPopup("<h1>" + feature.properties.ADMIN + "</h1> <hr> <h2>" + feature.properties.sui_per_100k_2015 + "</h2>");
        }
      })

      var happy_map = L.geoJson(data, {
        style: function(feature) {
          return {
            color: 'white',
            fillColor: getColor(feature.properties.happiness_score_2015),
            fillOpacity: 0.5,
            weight: 1.5
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.5
              });
            },
            click: function(event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          layer.bindPopup("<h1>" + feature.properties.ADMIN + "</h1> <hr> <h2>" + feature.properties.sui_per_100k_2015 + "</h2>");
        }
      });

      var gdp_map = L.geoJson(data, {
        style: function(feature) {
          return {
            color: 'white',
            fillColor: getColor(feature.properties.economy_gdp_per_capita_2015)
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.5
              });
            },
            click: function(event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          layer.bindPopup("<h1>" + feature.properties.ADMIN + "</h1> <hr> <h2>" + feature.properties.sui_per_100k_2015 + "</h2>");
        }
      })

      var hdi_map = L.geoJson(data, {
        style: function(feature) {
          return {
            color: 'white',
            fillColor: getColor(feature.properties.human_development_index)
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.5
              });
            },
            click: function(event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          layer.bindPopup("<h1>" + feature.properties.ADMIN + "</h1> <hr> <h2>" + feature.properties.sui_per_100k_2015 + "</h2>");
        }
      })
      var baseMaps = {
        'Suicides per 100k': sui_map,
        'Happiness Score': happy_map,
        'GDP per Capita': gdp_map,
        'Human Development Index': hdi_map
      };

      L.control.layers(baseMaps).addTo(myMap);
      // gdp_map.addTo(myMap);
    })
    
  })








function getColor(d) {
  return d > 10 ? '#00FFFF' :
        d > 7 ? '#0000FF' :
        d > 5 ? '#9900e6' :
        d > 3 ? '#CCCCFF' :
        d > 1 ? 'yellow' :
        d > 0 ? 'green' :
        'black';
};

var link = 'countries.geojson';









// Creation of navbar

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
};

 
