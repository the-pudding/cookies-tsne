d3.csv('oreos_tsn.csv', function (error, data) {

  console.log(data);

  var height = 800,
    width = 1400;
  padding = 100;

  var svgScatterplot = d3.select("div.scatterplot")
    .append("svg")
    .attr('height', height)
    .attr('width', width)
    .attr('class', 'scatterplot');



  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, function (d) {
      return +d.x;
    }))
    .range([0, width - (2 * padding)])


  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, function (d) {
      return +d.y;
    }))
    .range([0, height - padding])

  function writeToDisk(id) {
    $.post('/', {
      id: id
    }, function (success) {
      if (!success) console.log('error')
      console.log('saved', id)
    })
  }



  var circles =
    svgScatterplot.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cx', function (d) {
      return xScale(+d.x);
    })
    .attr('cy', function (d) {
      return yScale(+d.y);
    })
    .attr('r', d => {
      if (d.question.includes('mustard')) {
        return 6
      } else {
        return 2
      }
    })
    .attr('class', 'circles-data')
    .style('fill', '#F9F7F1')
    .attr('stroke', d => {
      if (d.question.includes('mustard')) {
        console.log('nice')
        return 'red'
      } else {
        return 'black'
      }
    })
    .attr('stroke-width', d => {
      if (d.question.includes('mustard')) {
        return '3px'
      } else {
        return '1px'
      }
    })


  d3.selectAll("circle.circles-data")
    .on("mouseover", function (d) {

      var xPos = +d3.select(this).attr("cx")
      var yPos = +d3.select(this).attr("cy") + padding;

      d3.select("div.tooltip")
        .classed('hidden', false)
        .style('top', (yPos + 50) + "px")
        .style('left', (xPos + 50) + "px")

      d3.select("span#message-value")
        .text(d.question)

    })
});
