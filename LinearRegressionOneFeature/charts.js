(function () {
  "use strict";

  function Charts() { };

  function renderChartBase(svg, aData, sXAttribute, sYAttribute) {
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .rangeRound([0, width]);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

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

    return {
      svg: svg,
      margin: margin,
      height: height,
      width: width,
      x: x,
      y: y,
      g: g,
      srcData: aData
    }
  }

  Charts.prototype.plotLine = function (svg, aData, sXAttribute, sYAttribute) {

    var mParts = renderChartBase(svg, aData, sXAttribute, sYAttribute);

    var line = d3.line()
      .x(function (d) { return mParts.x(d[sXAttribute]); })
      .y(function (d) { return mParts.y(d[sYAttribute]); });

    mParts.g.append("path")
      .datum(aData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    return mParts;

  }

  Charts.prototype.plotScatter = function (svg, aData, sXAttribute, sYAttribute) {

    var mParts = renderChartBase(svg, aData, sXAttribute, sYAttribute);

    var yMap = function (d) { return mParts.y(d[sYAttribute]); }; // data -> display
    var xMap = function (d) { return mParts.x(d[sXAttribute]); }; // data -> display
    // draw dots
    mParts.g.selectAll(".dot")
      .data(aData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", 'red');

    return mParts;
  }

  Charts.prototype.plotHipothesis = function (svg, aOriginalData, aHipothesisData, sXAttribute, sYAttribute) {

    var mParts = this.plotScatter(svg, aOriginalData, sXAttribute, sYAttribute);
    d3.selectAll('.hipothesis').remove();
    // draw line
    var line = d3.line()
      .x(function (d) { return mParts.x(d[sXAttribute]); })
      .y(function (d) { return mParts.y(d[sYAttribute]); });

    mParts.g.append("path")
      .datum(aHipothesisData)
      .attr("fill", "none")
      .attr('class','hipothesis')
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

  }




  window.top.Charts = new Charts();

})();