// // The code for the chart is wrapped inside a function that
// // automatically resizes the chart
// function makeResponsive() {

//     // if the SVG area isn't empty when the browser loads,
//     // remove it and replace it with a resized version of the chart
//     var svgArea = d3.select("body").select("svg");
  
//     // clear svg is not empty
//     if (!svgArea.empty()) {
//       svgArea.remove();
//     }
  
//     // SVG wrapper dimensions are determined by the current width and
//     // height of the browser window.
//     var svgWidth = window.innerWidth;
//     var svgHeight = window.innerHeight;
  
//     var margin = {
//       top: 50,
//       bottom: 50,
//       right: 50,
//       left: 50
//     };
  
//     var height = svgHeight - margin.top - margin.bottom;
//     var width = svgHeight - margin.left - margin.right;
  
//     // Append SVG element
//     var svg = d3
//       .select("#scatter")
//       .append("svg")
//       .attr("height", svgHeight)
//       .attr("width", svgWidth);
  
//     // Append group element
//     var chartGroup = svg.append("g")
//       .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
//     // Read CSV
//     d3.csv("country_data.csv").then(function(countryData) {
//         console.log(countryData);
//       // create date parser
//       var dateParser = d3.timeParse("%d-%b");
  
//       // parse data
//       countryData.forEach(function(data) {
//         data.happiness_score = +data.happiness_score_2015;
//         data.total_suicides_no = +data.sui_per_100k_2015;
//       });
  
//       // create scales
//       var xLinearScale = d3.scaleLinear()
//             .domain([1, 8])
//             .range([0, width]);
  
//       var yLinearScale = d3.scaleLinear()
//         .domain([0, 30])
//         .range([height, 0]);
  
//       // create axes
//       var xAxis = d3.axisBottom(xLinearScale);
//       var yAxis = d3.axisLeft(yLinearScale).ticks(6);
  
//       // append axes
//       chartGroup.append("g")
//         .attr("transform", `translate(0, ${height})`)
//         .call(xAxis);
  
//       chartGroup.append("g")
//         .call(yAxis);
  
//       // line generator
//     //   var line = d3.line()
//     //     .x(d => xLinearScale(d.date))
//     //     .y(d => yLinearScale(d.medals));
  
//       // append line
//     //   chartGroup.append("path")
//     //     .data([countryData])
//     //     .attr("d", line)
//     //     .attr("fill", "none")
//     //     .attr("stroke", "red");
  
//       // append circles
//       var circlesGroup = chartGroup.selectAll("circle")
//         .data(countryData)
//         .enter()
//         .append("circle")
//         .attr("cx", d => xLinearScale(d.happiness_score_2015))
//         .attr("cy", d => yLinearScale(d.sui_per_100k_2015))
//         .attr("r", "10")
//         .attr("fill", "gold")
//         .attr("stroke-width", "1")
//         .attr("stroke", "black");
  
//       // date formatter to display dates nicely
//       var dateFormatter = d3.timeFormat("%d-%b");
  
//       // Step 1: Append tooltip div
//       var toolTip = d3.select('body').append('div')
//         .attr('class', 'tooltip');
  
//       // Step 2: Create "mouseover" event listener to display tooltip
//       circlesGroup.on('click', function(d) {
//         toolTip.style('display', 'block');
//         toolTip.html(`Country: <strong>${d.country}</strong>`)
//           .style('left', d3.event.pageX + 'px')
//           .style('top', d3.event.pageY + 'px');
//       })
  
//       // Step 3: Create "mouseout" event listener to hide tooltip
//         // .on('mouseout', function() {
//         //   toolTip.style('display', 'none');
//         // })
  
//     }).catch(function(error) {
//       console.log(error);
//     });
//   }
  
//   // When the browser loads, makeResponsive() is called.
//   makeResponsive();
  
//   // When the browser window is resized, makeResponsive() is called.
//   d3.select(window).on("resize", makeResponsive);
// d3.csv("country_data.csv").then(function(countryData) {
//     d3.select("tbody")
//     .selectAll("tr")
//     .data(countryData)
//     .enter()
//     .append("tr")
//     .html(function(d) {
//         return `<td>${d.country}</td><td>${d.economy_gdp_per_capita_2015}</td><td>${d.sui_per_100k_2015}</td><td>${d.happiness_score_2015}</td>`;
//     });
// });




var svgWidth = 2000;
var svgHeight = 1000;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "happiness_score_2015";

// function used for updating x-scale var upon click on axis label
function xScale(countryData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(countryData, d => d[chosenXAxis]),
      d3.max(countryData, d => d[chosenXAxis])
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "happiness_score_2015") {
    label = "2015 Happiness Index Score";
  }
  else if (chosenXAxis === "economy_gdp_per_capita_2015") {
    label = "GDP per Capita";
  }
  else {
    label = 'Human Development Index';
  }

//   var body = ;

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
        return (`${d.country}<br>${label} ${d[chosenXAxis]}<br>Suicides per 100k:  ${d.sui_per_100k_2015}<br>Happiness Rank: ${d.happiness_rank_2015}<br>HDI Rank: ${d.hdi_rank}`);
        });
    // var table = d3.select("tbody")
    //     .selectAll("tr")
    //     .data(countryData)
    //     .enter()
    //     .append("tr")
    //     .html(function(d) {
    //         return `<td>${d.country}</td><td>${d.economy_gdp_per_capita_2015}</td><td>${d.sui_per_100k_2015}</td><td>${d.happiness_score_2015}</td>`;
    //     });

  circlesGroup.call(toolTip);
//   circlesGroup.call(table);

  circlesGroup.on("click", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
  //   .on("mouseout", function(data, index) {
  //     toolTip.hide(data);
  // });

  return circlesGroup;
}

// Create functions to assign colors to the different regions
function getColor(d) {
  return d == 'Australia and New Zealand' ? '#00FFFF' :
        d == 'Central and Eastern Europe'  ? '#0000FF' :
        d == 'Eastern Asia'  ? '#00A36C' :
        d == 'Latin America and Caribbean'   ? '#CCCCFF' :
        d == 'Middle East and Northern Africa'   ? '#E97451' :
        d == 'North America'   ? '#800000' :
        d == 'Southeastern Asia'   ? '#097969' :
        d == 'Southern Asia'   ? '#90EE90' :
        d == 'Sub-Saharan Africa'   ? '#CC5500' :
        d == 'Western Europe'   ? '#DC143C' :
                    '#00FF00';
}

// Retrieve data from the CSV file and execute everything below
d3.csv("country_data.csv").then(function(countryData, err) {
  if (err) throw err;
  console.log(countryData);

  // parse data
  countryData.forEach(function(data) {
    data.happiness_score_2015 = +data.happiness_score_2015;
    data.sui_per_100k_2015 = +data.sui_per_100k_2015;
    data.economy_gdp_per_capita_2015 = +data.economy_gdp_per_capita_2015;
    data.human_development_index = +data.human_development_index;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(countryData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(countryData, d => d.sui_per_100k_2015)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(countryData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.sui_per_100k_2015))
    .attr("r", 10)
    .attr("fill", d => getColor(d.region))
    .attr('text', d => d.country)
    .attr("opacity", ".5");

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var happinessLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "happiness_score_2015") // value to grab for event listener
    .classed("active", true)
    .text("Happiness Index Score");

  var gdpLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "economy_gdp_per_capita_2015") // value to grab for event listener
    .classed("inactive", true)
    .text("GDP per Capita (2015)");

    var hdiLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "human_development_index") // value to grab for event listener
        .classed("inactive", true)
        .text("Human Development Index");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Suicides per 100k (2015)");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(countryData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "economy_gdp_per_capita_2015") {
            gdpLabel
                .classed("active", true)
                .classed("inactive", false);
            happinessLabel
                .classed("active", false)
                .classed("inactive", true);
            hdiLabel
                .classed("active", false)
                .classed("inactive", true);
        }
        else if (chosenXAxis === 'happiness_score_2015') {
            gdpLabel
                .classed("active", false)
                .classed("inactive", true);
            happinessLabel
                .classed("active", true)
                .classed("inactive", false);
            hdiLabel
                .classed("active", false)
                .classed("inactive", true);
        }
        else {
            gdpLabel
                .classed("active", false)
                .classed("inactive", true);
            happinessLabel
                .classed("active", false)
                .classed("inactive", true);
            hdiLabel
                .classed("active", true)
                .classed("inactive", false);
        }
      }
    });
});

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


