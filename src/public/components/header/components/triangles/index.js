import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import styles from './index.scss';

export default class Triangles extends React.Component {
  static propTypes = {
    size: PropTypes.number
  };
  static defaultProps = {
    size: 40
  };

  fillHeight = 0;
  fillWidth = 0;

  make(ele, direction, color, x, y) {
    const tri = document.createElement('div');
    tri.className = styles[direction];
    tri.style.borderWidth = `${this.props.size}px`;
    tri.style.left = `${x}px`;
    tri.style.top = `${y}px`;

    switch(direction) {
    case 'up':
      tri.style.borderBottomColor = color;
      break;
    case 'down':
      tri.style.borderTopColor = color;
      break;
    }

    ele.appendChild(tri);
  }

  fill() { // eslint-disable-line max-statements
    const canvas = this.canvas;
    const batch = document.createElement('div');
    let color, rgb;
    let x = -this.props.size;
    let y = 0;
    let up = true;
    const fillHeight = canvas.clientHeight;
    const fillWidth = canvas.clientWidth;

    if(this.fillHeight !== fillHeight || this.fillWidth !== fillWidth) {
      // new dimensions, change
      this.fillHeight = fillHeight;
      this.fillWidth = fillWidth;
    }
    else{
      // same dimensions, dont change
      return;
    }


    const amount = Math.ceil(fillHeight / this.props.size) * (Math.ceil(fillWidth / this.props.size) + 1);

    for(let i = 0; i <= amount; i++) {
      color = Math.floor(Math.random() * (246 - 220) + 220);
      rgb = `rgb(${color}, ${color}, ${color})`;

      if(up) {
        const adjustedY = y - this.props.size;
        this.make(batch, 'up', rgb, x, adjustedY);
      }
      else{
        this.make(batch, 'down', rgb, x, y);
      }

      x += this.props.size;
      up = !up;

      if(x >= canvas.clientWidth) {
        x = -this.props.size;
        y += this.props.size;
      }
    }

    canvas.innerHTML = '';
    canvas.appendChild(batch);
  }

  constructor(props) {
    super(props);
    this.limitedFillCanvas = debounce(() => this.fill(), 300);
  }

  componentDidMount() {
    this.fill();
    window.addEventListener('resize', this.limitedFillCanvas, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.limitedFillCanvas, false);
  }

  render() {
    return (
      <div
        styleName="canvas"
        ref={ (ele) => {
          this.canvas = ele;
        } }
      />
    );
  }
}
