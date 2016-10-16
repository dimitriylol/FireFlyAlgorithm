function buildGraph (response) {
    var result = (JSON.parse(response))[0];
    var data = result.graphic.values;
    var axisXname = result.graphic.axisX;
    var axisYname = result.graphic.axisY;

    // Scale the range of the data
    x.domain([0, d3.max(data, function(d) {
        return d[axisXname];
    })]);
    y.domain([0, d3.max(data, function(d) {
        return d[axisYname];
    })]);

    // Define the line
    var valueline = d3.svg.line()
            .x(function(d) { return x(d[axisXname]); })
            .y(function(d) { return y(d[axisYname]); });
    
    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d[axisXname]); })
        .attr("cy", function(d) { return y(d[axisYname]); });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}
