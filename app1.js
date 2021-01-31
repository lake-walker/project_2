// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgHeight - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Read CSV
    d3.csv("country_data.csv").then(function(countryData) {
  
      // create date parser
      var dateParser = d3.timeParse("%d-%b");
  
      // parse data
      countryData.forEach(function(data) {
        data.happiness_score = +data.happiness_score;
        data.total_suicides_no = +data.total_suicides_no;
      });
  
      // create scales
      var xTimeScale = d3.scaleTime()
        .domain(d3.extent(countryData, d => d.happiness_score))
        .range([0, width]);
  
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(countryData, d => d.total_suicides_no)])
        .range([height, 0]);
  
      // create axes
      var xAxis = d3.axisBottom(xTimeScale);
      var yAxis = d3.axisLeft(yLinearScale).ticks(6);
  
      // append axes
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
  
      chartGroup.append("g")
        .call(yAxis);
  
      // line generator
    //   var line = d3.line()
    //     .x(d => xTimeScale(d.date))
    //     .y(d => yLinearScale(d.medals));
  
      // append line
    //   chartGroup.append("path")
    //     .data([countryData])
    //     .attr("d", line)
    //     .attr("fill", "none")
    //     .attr("stroke", "red");
  
      // append circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(countryData)
        .enter()
        .append("circle")
        .attr("cx", d => xTimeScale(d.happiness_score))
        .attr("cy", d => yLinearScale(d.total_suicides_no))
        .attr("r", "10")
        .attr("fill", "gold")
        .attr("stroke-width", "1")
        .attr("stroke", "black");
  
      // date formatter to display dates nicely
      var dateFormatter = d3.timeFormat("%d-%b");
  
      // Step 1: Append tooltip div
      var toolTip = d3.select('body').append('div')
        .attr('class', 'tooltip');
  
      // Step 2: Create "mouseover" event listener to display tooltip
      circlesGroup.on('click', function(d) {
        toolTip.style('display', 'block');
        toolTip.html(`Country: <strong>${d.country}</strong>`)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY + 'px');
      })
  
      // Step 3: Create "mouseout" event listener to hide tooltip
        // .on('mouseout', function() {
        //   toolTip.style('display', 'none');
        // })
  
    }).catch(function(error) {
      console.log(error);
    });
  }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, makeResponsive() is called.
  d3.select(window).on("resize", makeResponsive);