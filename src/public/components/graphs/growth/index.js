import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import './index.scss';

function GrowthGraph(props) {
  const container = useRef(null);

  useEffect(() => {
    build();
  }, []);

  function abbreviate(num) {
    let abbr;

    if(num >= 1000000)
      abbr = `${(num / 1000000).toFixed(1)}m`;

    else if(num >= 1000)
      abbr = `${(num / 1000 | 0)}k`;

    else
      abbr = num;

    return abbr;
  }

  function build() { // eslint-disable-line max-statements
    const selectedContainer = d3.select(container.current);
    const dataUrl = props.dataUrl;
    const xLabel = props.xLabel;
    const accumulate = props.accumulate;

    const margin = { top: 10, right: 0, bottom: 20, left: 0 };
    const width = 175;
    const totalWidth = width + margin.right + margin.left;
    const height = 100;
    const totalHeight = height + margin.top + margin.bottom;
    const alignFit = 'xMidYMid meet';
    const xYWidthHeight = `0 0 ${totalWidth} ${totalHeight}`;

    const formatDate = d3.timeParse('%Y-%m-%d');

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x).ticks(0).tickSize(0);
    const yAxis = d3.axisLeft(y).ticks(0).tickSize(0);

    const area = d3.area()
      .x(function(d) {
        return x(d.date);
      })
      .y0(height)
      .y1(function(d) {
        return y(d.count);
      });

    const line = d3.line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.count);
      });

    const svg = selectedContainer.append('svg')
      .attr('preserveAspectRatio', alignFit)
      .attr('viewBox', xYWidthHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    d3.json(dataUrl, (error, data) => {
      if (error) throw error;

      let runningTotal = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        data[i].date = formatDate(data[i].date);
        if(accumulate)
          data[i].count = runningTotal += data[i].count;
      }

      if(!accumulate && data.length) {
        runningTotal = data[data.length - 1].count;
      }

      selectedContainer.append('span')
        .attr('class', 'growth-overview-total')
        .text(abbreviate(runningTotal));

      x.domain(d3.extent(data, function(d) {
        return d.date;
      }));
      y.domain(d3.extent(data, function(d) {
        return d.count;
      }));

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width / 2},${height + margin.top + 5})`)
        .text(xLabel);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

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

  return (
    <div ref={container}></div>
  );
}

GrowthGraph.propTypes = {
  dataUrl: PropTypes.string.isRequired, // where to fetch graph data
  xLabel: PropTypes.string.isRequired,
  // You want the data to accumulate to show the growth. Set to false if data is already accumulated.
  accumulate: PropTypes.bool.isRequired
};

export default GrowthGraph;
