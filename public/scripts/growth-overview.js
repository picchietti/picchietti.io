function abbreviate(num){
  var abbr;

  if(num >= 1000000)
    abbr = (num / 1000000).toFixed(1) + 'm';

  else if(num >= 1000)
    abbr = (num / 1000 | 0) + 'k';

  else
    abbr = num;

  return abbr;
}

function growth_overview (container_select, data_url, x_label, compound) {
  var margin = {top: 10, right: 0, bottom: 20, left: 0},
      width = 175 - margin.left - margin.right,
      height = 120 - margin.top - margin.bottom;

  var formatDate = d3.time.format("%Y-%m-%d");

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(0)
      .tickFormat(d3.time.format("%b"))
      .tickSize(5, 0);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(5, 0)
      .ticks(0)

  var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.count); });

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.count); });

      var container = d3.select(container_select);

      var svg = container.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.json(data_url, function(error, data) {
        if (error) throw error;

        var running_count = 0;
        for (var i=0, j=data.length; i<j; i++) {
          data[i].date = formatDate.parse(data[i].date);
          if(compound)
            data[i].count = running_count += data[i].count;
        }

        if(!compound && data.length)
          running_count = data[data.length-1].count;

        var running_count_insert = document.createElement('span');
        running_count_insert.innerHTML = abbreviate(running_count);
        running_count_insert.className = "growth-overview-total";
        container[0][0].appendChild(running_count_insert);

        x.domain(d3.extent(data, function(d) {return d.date;}));
        y.domain(d3.extent(data, function(d) {return d.count;}));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", "1.5em")
            .text(x_label);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)

        svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);
      });
}
