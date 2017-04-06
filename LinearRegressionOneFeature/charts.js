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

  Charts.prototype.plotScatterPlot = function(svg, aData, xAttribute, yAttribute){

  }

  window.top.Charts = new Charts();

})();