(function () {
  "use strict";

  function Charts() { }

  Charts.prototype.plotLine = function (svg, aData, sXAttribute, sYAttribute) {
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .rangeRound([0, width]);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var line = d3.line()
      .x(function (d) { return x(d[sXAttribute]); })
      .y(function (d) { return y(d[sYAttribute]); });

    x.domain(d3.extent(aData, function (d) { return d[sXAttribute]; }));
    y.domain(d3.extent(aData, function (d) { return d[sYAttribute]; }));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("fill", "#000")
      .attr("y", 20)
      .attr("x", 9)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(sXAttribute);


    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(sYAttribute);

    g.append("path")
      .datum(aData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

  }

  Charts.prototype.plotScatterPlot = function (svg, aData, sXAttribute, sYAttribute) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    /* 
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */

    // setup x 
    var xValue = function (d) { return d[sXAttribute]; }; // data -> value
    var xScale = d3.scaleLinear().range([0, width]); // value -> display
    var xMap = function (d) { return xScale(xValue(d)); }; // data -> display
    var xAxis = d3.axisBottom(xScale);

    // setup y
    var yValue = function (d) { return d[sYAttribute]; }; // data -> value
    var yScale = d3.scaleLinear().range([height, 0]); // value -> display
    var yMap = function (d) { return yScale(yValue(d)); }; // data -> display
    var yAxis = d3.axisLeft(yScale);
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the graph canvas to the body of the webpage
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   
    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(aData, xValue) - 1, d3.max(aData, xValue) + 1]);
    yScale.domain([d3.min(aData, yValue) - 1, d3.max(aData, yValue) + 1]);


    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("y", 20)
      .attr("x", 9)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(sXAttribute);

    g.append("g")
      .call(yAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(sYAttribute);


    // draw dots
    svg.selectAll(".dot")
      .data(aData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", 'red');
     
  }

  window.top.Charts = new Charts();

})();