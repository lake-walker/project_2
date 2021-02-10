// Map creation

// Outlines for every country
var myMap = L.map("map", {
    center: [25.0000, -0.0098],
    zoom: 2
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

// bring in the geojson data as well as the csv country data for mapping
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

      // create each individual legend for each map
      var suiLegend = L.control({position: 'bottomright'});
      suiLegend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div','info legend'),
          grades = [1,5,10,15,20,25],
          labels = [],
          from, to;
        for (var i = 0; i < grades.length; i++) {
          from = grades[i];
          to = grades[i + 1];

          labels.push(
            '<i style="background:' + getSUIColor(from + 1) + '"></i>' + from + (to ? '&ndash;' + to : '+')
          );
        }
        div.innerHTML = labels.join('<br>');
        return div;
      };
      var gdpLegend = L.control({position: 'bottomright'});
      gdpLegend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div','info legend'),
          grades = [0.01,0.2,0.5,0.9,1.25,1.5],
          labels = [],
          from, to;
        for (var i = 0; i < grades.length; i++) {
          from = grades[i];
          to = grades[i + 1];

          labels.push(
            '<i style="background:' + getGDPColor(grades[i]) + '"></i>' + (grades[i] ?  grades[i] + '<br>' : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;
      };
      var happyLegend = L.control({position: 'bottomright'});
      happyLegend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div','info legend'),
          grades = [2,3,4,5,6,7],
          labels = [],
          from, to;
        for (var i = 0; i < grades.length; i++) {
          from = grades[i];
          to = grades[i + 1];

          labels.push(
            '<i style="background:' + getHappyColor(from + 1) + '"></i>' + from + (to ? '&ndash;' + to : '+')
          );
        }
        div.innerHTML = labels.join('<br>');
        return div;
      };
      var hdiLegend = L.control({position: 'bottomright'});
      hdiLegend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div','info legend'),
          grades = [0.3,0.5,0.6,0.7,0.8,0.9],
          labels = [];
          
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getHDIColor(grades[i]) + '"></i>' + (grades[i] ?  grades[i] + '<br>' : '+')
          
        }
        return div;
      };

      console.log(data);

      // Create each map
      var sui_map = L.geoJson(data, {
        style: function(feature) {
          return {
            color: 'white',
            fillColor: getSUIColor(feature.properties.sui_per_100k_2015),
            fillOpacity: 0.8,
            weight: 1.5
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 1
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.8
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
            fillColor: getHappyColor(feature.properties.happiness_score_2015),
            fillOpacity: 0.8,
            weight: 1.5
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 1
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.8
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
            fillColor: getGDPColor(feature.properties.economy_gdp_per_capita_2015),
            fillOpacity: 0.8,
            weight: 1.5
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 1
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.8
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
            fillColor: getHDIColor(feature.properties.human_development_index),
            fillOpacity: 0.8,
            weight: 1.5
          };
        },
        onEachFeature: function(feature, layer) {
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 1
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.8
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

      var overlayMaps = {};

      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false,
        position: 'bottomleft'
      }).addTo(myMap);

      suiLegend.addTo(myMap);
      currentLegend = suiLegend;

      myMap.on('baselayerchange', function (eventLayer) {
        console.log(eventLayer);
        if (eventLayer.name === 'Suicides per 100k') {
          myMap.removeControl(currentLegend );
          currentLegend = suiLegend;
          suiLegend.addTo(myMap);
        }
        else if (eventLayer.name === 'Happiness Score') {
          myMap.removeControl(currentLegend );
          currentLegend = happyLegend;
          happyLegend.addTo(myMap);
        }
        else if (eventLayer.name === 'GDP per Capita') {
          myMap.removeControl(currentLegend );
          currentLegend = gdpLegend;
          gdpLegend.addTo(myMap);
        }
        else if (eventLayer.name === 'Human Development Index') {
          myMap.removeControl(currentLegend );
          currentLegend = hdiLegend;
          hdiLegend.addTo(myMap);
        }
        
      });
    })
    
  })








function getSUIColor(d) {
  // console.log(d);
  return d > 25 ? '#424214' :
        d > 20 ? '#72A13B' :
        d > 15 ? '#72F66D' :
        d > 10 ? '#AAF984' :
        d > 5 ? '#D6FB9B' :
        d > 1 ? '#F6FDB3' :
        'black';
};

function getGDPColor(d) {
  return d > 1.5 ? '#1F2209' :
        d > 1.25 ? '#2F4D19' :
        d > 0.9 ? '#307335' :
        d > 0.5 ? '#5E8B52' :
        d > 0.2 ? '#8CA374' :
        d > 0.01 ? '#B3BA96' :
        'black';
};

function getHappyColor(d) {
  return d > 7 ? '#420028' :
        d > 6 ? '#940518' :
        d > 5 ? '#D55D1D' :
        d > 4 ? '#DE4A41' :
        d > 3 ? '#E66583' :
        d > 2 ? '#EE8ABE' :
        'black';
};

function getHDIColor(d) {
  // console.log(d);
  return d > 0.9 ? '#102B57' :
        d > 0.8 ? '#185472' :
        d > 0.7 ? '#20878C' :
        d > 0.6 ? '#29A588' :
        d > 0.5 ? '#5FC085' :
        d > 0.3 ? '#97D999' :
        'black';
};

console.log(getHDIColor(0.55));

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

 
