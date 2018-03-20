import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import './index.scss';

export default class GrowthGraph extends React.Component {
  static propTypes = {
    dataUrl: PropTypes.string.isRequired, // where to fetch graph data
    xLabel: PropTypes.string.isRequired,
    // You want the data to accumulate to show the growth. Set to false if data is already accumulated.
    accumulate: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.build();
  }

  abbreviate(num) {
    let abbr;

    if(num >= 1000000)
      abbr = (num / 1000000).toFixed(1) + 'm';

    else if(num >= 1000)
      abbr = (num / 1000 | 0) + 'k';

    else
      abbr = num;

    return abbr;
  }

  build () {
    this.container = ReactDOM.findDOMNode(this);
    const selected_container = d3.select(this.container);
    const data_url = this.props.dataUrl;
    const x_label = this.props.xLabel;
    const accumulate = this.props.accumulate;

    const margin = {top: 10, right: 0, bottom: 20, left: 0};
    const width = 175;
    const total_width = width + margin.right + margin.left;
    const height = 100;
    const total_height = height + margin.top + margin.bottom;
    const align_fit = 'xMidYMid meet';
    const x_y_width_height = `0 0 ${total_width} ${total_height}`;

    const formatDate = d3.timeParse('%Y-%m-%d');

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x).ticks(0).tickSize(0)
    const yAxis = d3.axisLeft(y).ticks(0).tickSize(0)

    const area = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.count); });

    const line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.count); });

    const svg = selected_container.append('svg')
      .attr('preserveAspectRatio', align_fit)
      .attr('viewBox', x_y_width_height)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.json(data_url, (error, data) => {
      if (error) throw error;

      let running_total = 0;
      for (let i=0, j=data.length; i<j; i++) {
        data[i].date = formatDate(data[i].date);
        if(accumulate)
          data[i].count = running_total += data[i].count;
      }

      if(!accumulate && data.length){
        running_total = data[data.length-1].count;
      }

      selected_container.append('span')
        .attr('class', 'growth-overview-total')
        .text(this.abbreviate(running_total));

      x.domain(d3.extent(data, function(d) {return d.date;}));
      y.domain(d3.extent(data, function(d) {return d.count;}));

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top + 5) + ')')
        .text(x_label);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)

      svg.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area);

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);
    });
  }

  render() {
    return (
      <div></div>
    );
  }
}
