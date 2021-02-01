d3.csv('country_data.csv').then(function(data) {
    d3.select("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.country}</td><td>${d.economy_gdp_per_capita_2015}</td><td>${d.sui_per_100k_2015}</td><td>${d.happiness_score_2015}</td><td>${d.human_development_index}</td>`;
        });
    

    // Get the columns. 
    // var values = d3.keys(data.country);

    // Create a select element
    var select = d3.select("body")
        .append("select")
        .on("change", function() {
            console.log(this.value);
        })

    // Add an initial option:
    select.append("option")
        .html("Select Value:")

    // Add the options:
    var options = select.selectAll(null)
        .data(data)
        .enter()
        .append("option")
        .text(function(d) { return d.country; });

})