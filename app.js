
// Map section of app creation
// funcion to return marker size based on suicides
function SuicideMarkerSize(score) {
    return score * 10000;
}
function HappinessMarkerSize(happy) {
    return happy * 10000;
}
function gdpMarkerSize(happy) {
    return happy * 100000;
}



// Define arrays to hold created country markers 
var suicideMarkers = [];
var happinessMarkers = [];
var gdpMarkers = [];



d3.csv('country_data.csv').then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        suicideMarkers.push(
            L.circle([data[i].latitude, data[i].longitude], {
                stroke: false,
                fillOpacity: 0.75,
                color: 'red',
                fillColor: 'red',
                radius: SuicideMarkerSize(data[i].sui_per_100k_2015)
            })
        );

        happinessMarkers.push(
            L.circle([data[i].latitude, data[i].longitude], {
                stroke: false,
                fillOpacity: 0.75,
                color: 'purple',
                fillColor: 'purple',
                radius: HappinessMarkerSize(data[i].happiness_score_2015)
            })
        );

        gdpMarkers.push(
            L.circle([data[i].latitude, data[i].longitude], {
                stroke: false,
                fillOpacity: 0.75,
                color: 'green',
                fillColor: 'green',
                radius: gdpMarkerSize(data[i].economy_gdp_per_capita_2015)
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
    var gdp = L.layerGroup(gdpMarkers);
    
    var baseMaps = {
        'Street Map': streetmap,
        'Dark Map': darkmap
    };
    
    var overlayMaps = {
        'Suicide Number': suicides,
        'Happiness Score': happiness,
        'GDP per Capita': gdp
    };
    
    var myMap = L.map('map', {
        center: [51.4934, 0.0098],
        zoom: 2,
        layers: [streetmap, suicides, happiness, gdp]
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


// // Bubble chart with D3 selection
// // Create and set the svg elements
// function makeResponsive() {
//     var svgArea = d3.select('body').select('svg');
//     if (!svgArea.empty()) {
//         svgArea.remove();
//     }

//     var svgWidth = 960;
//     var svgHeight = 700;

//     var margin = {
//         top: 20,
//         right: 40,
//         bottom: 60,
//         left: 50
//     };

//     var width = svgWidth - margin.left - margin.right;
//     var height = svgHeight - margin.top - margin.bottom;

//     var svg = d3.select('#scatter')
//         .append('svg')
//         .attr('width', svgWidth)
//         .attr('height', svgHeight);

//     var chartGroup = svg.append('g')
//         .attr('transform', `translate(${margin.left}, ${margin.right})`);

//     d3.csv('country_data.csv').then(function(data) {
//         //parse data/cast as numbers
//         data.forEach(d => {
//             d.total_suicides_no = +d.total_suicides_no;
//             d.happiness_score = +d.happiness_score;
//         });

//         // Create scale functions
//         var xLinearScale = d3.scaleLinear()
//             .domain([4, d3.max(data, d => d.happiness_score)])
//             .range([0, width]);

//         var yLinearScale = d3.scaleLinear()
//             .domain([0, d3.max(data, d=> d.total_suicides_no)])
//             .range([height, 0]);
        
//         // Create axis functions
//         var bottomAxis = d3.axisBottom(xLinearScale);
//         var leftAxis = d3.axisLeft(yLinearScale);

//         // Append Axes to the chartGroup
//         chartGroup.append('g')
//             .attr('transform', `translate(0, ${height})`)
//             .call(bottomAxis);
        
//         chartGroup.append('g')
//             .call(leftAxis);

//         // Create Circles
//         var circlesGroup = chartGroup.selectAll('circle')
//             .data(data)
//             .enter()
//             .append('circle')
//             .attr('cx', d => xLinearScale(d.happiness_score))
//             .attr('cy', d => yLinearScale(d.total_suicides_no))
//             .attr('r', '10') // Could make circles different sizes based on other variables
//             .attr('fill', 'blue')
//             .attr('opacity', '.5');
        
//         // Create Axes labels
//         chartGroup.append('text')
//             .attr('transform', 'rotate(-90)')
//             .attr('y', 0 - margin.left)
//             .attr('x', 0 - (height/2))
//             .attr('dy', '1em')
//             .attr('class', 'axisText')
//             .text('Total Suicides Number');
        
//         chartGroup.append('text')
//             .attr('transform', `translate(${width / 2}, ${height + margin.top + 30})`)
//             .attr('class', 'axisText')
//             .text('Happiness Index');
        
//         // Append a div to the body to create tooltips
//         var toolTip = d3.select('body').append('div').attr('class', 'tooltip');

//         // var toolTip = d3.tip()
//         //     .attr('class', 'tooltip')
//         //     .offset([80,-60])
//         //     .html(function(d) {
//         //         return (`Country: <strong>${data[i].country}</strong>`);
//         //     });
        
//         // chartGroup.call(toolTip);

//         // circlesGroup.on('mouseover', function(d) {
//         //     toolTip.show(d, this);
//         // })
//         //     .on('mouseout', function(d) {
//         //         toolTip.hide(d);
//         //     });

//         // add an onmouseover event to display a tooltip
//         circlesGroup.on('mouseover', function(d, i) {
//             toolTip.style('display', 'block');
//             toolTip.html(`Country: <strong>${data[i].country}</strong>`)
//                 .style('left', d3.event.pageX + 'px')
//                 .style('top', d3.event.pageY + 'px');
//         })
//             .on('mouseout', function() {
//                 toolTip.style('display', 'none');
//             });
        
        
//     }).catch(function(error) {
//         console.log(error);
//     });
// }

// makeResponsive();

// d3.select(svgArea).on('resize', makeResponsive);



 
