import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from 'lodash-es';

import styles from './index.css';

function GrowthGraph(props) {
  const { title, info } = props;
  const container = useRef(null);
  const [details, setDetails] = useState();
  let total;

  useEffect(() => {
    build();
  }, []);

  function abbreviate(num) {
    let abbr;

    if(num >= 1000000)
      abbr = `${(num / 1000000).toFixed(1)}m`;

    else if(num >= 10000)
      abbr = `${(num / 1000 | 0)}k`;

    else if(num > 999)
      abbr = num.toLocaleString();

    else
      abbr = num;

    return abbr;
  }

  function build() { // eslint-disable-line max-statements
    const selectedContainer = d3.select(container.current);
    const dataUrl = props.dataUrl;
    const accumulate = props.accumulate;

    const margin = { top: 10, right: 0, bottom: 20, left: 0 };
    const width = 175;
    const totalWidth = width + margin.right + margin.left;
    const height = 80;
    const totalHeight = height + margin.top + margin.bottom;
    const alignFit = 'xMidYMid meet';
    const xYWidthHeight = `0 0 ${totalWidth} ${totalHeight}`;

    const parseDate = d3.timeParse('%Y-%m-%d');
    const bisectDate = d3.bisector((d) => d.date).left;

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
      data.forEach((datum) => {
        datum.date = parseDate(datum.date);

        if(accumulate)
          datum.count = runningTotal += datum.count;
      });

      if(!accumulate && data.length) {
        runningTotal = data[data.length - 1].count;
      }

      total = `${abbreviate(runningTotal)} total`;
      setDetails(total);

      x.domain(d3.extent(data, function(d) {
        return d.date;
      }));
      y.domain(d3.extent(data, function(d) {
        return d.count;
      }));

      svg.append('g')
        .attr('class', `x ${styles.axis}`)
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width / 2},${height + margin.top + 5})`)
        .text(`Last ${data.length} ${props.xUnit}`);

      svg.append('g')
        .attr('class', `y ${styles.axis}`)
        .call(yAxis);

      svg.append('path')
        .datum(data)
        .attr('class', styles.area)
        .attr('d', area);

      svg.append('path')
        .datum(data)
        .attr('class', styles.line)
        .attr('d', line);

      svg.append('rect')
        .attr('class', styles.focus)
        .attr('width', width)
        .attr('height', height);

      svg.append('circle')
        .attr('class', styles.circle)
        .attr('r', 4);

      function showDatum(mouseX) {
        const x0 = x.invert(mouseX);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = (x0 - d0.date > d1.date - x0) ? d1 : d0;

        const dCount = d.count.toLocaleString();
        const formatDate = d3.timeFormat('%Y-%m-%d');
        const dDate = formatDate(d.date);

        setDetails(`${dCount} on ${dDate}`);
        svg.select(`.${styles.circle}`)
          .attr('transform', `translate(${x(d.date)},${y(d.count)})`);
      }
      const rateLimitedShowDatum = throttle(showDatum, 10);

      svg
        .on('mouseover touchstart', function() {
          const mouseX = d3.mouse(this)[0];
          showDatum(mouseX);
          svg.select(`.${styles.circle}`)
            .classed(styles.fill, true);
        })
        .on('mouseout touchend touchcancel', () => {
          setDetails(total);
          svg.select(`.${styles.circle}`)
            .classed(styles.fill, false);
        })
        .on('mousemove touchmove', function() {
          const mouseX = d3.mouse(this)[0];
          if(mouseX > 0 && mouseX < width) {
            rateLimitedShowDatum(mouseX);
          }
        });
    });
  }

  return (
    <div styleName="growth-overview">
      { title &&
        <div styleName="title">
          {title}
          {(info) ? <span>&nbsp;<FontAwesomeIcon icon="info-circle" title={info} /></span> : ''}
        </div>
      }
      <div styleName="details">
        { details }
      </div>
      <div ref={container}></div>
    </div>
  );
}

GrowthGraph.propTypes = {
  dataUrl: PropTypes.string.isRequired, // where to fetch graph data
  xUnit: PropTypes.string.isRequired, // what the data on the x-axis represents
  // You want the data to accumulate to show the growth. Set to false if data is already accumulated.
  accumulate: PropTypes.bool.isRequired,
  title: PropTypes.string,
  info: PropTypes.string
};

export default GrowthGraph;
