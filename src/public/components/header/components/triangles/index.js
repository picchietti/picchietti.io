import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import seedRandom from 'seedrandom';

import './index.scss';

export default class Triangles extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    seed: PropTypes.any
  };
  static defaultProps = {
    size: 80,
    seed: (new Date()).getTime()
  };

  draw(triangles) {
    const context = this.context;
    const drawTriangle = (triangle, i) => {
      context.fillStyle = context.strokeStyle = triangle.color;
      const points = triangle.points;
      context.beginPath();
      context.moveTo(points[0][0], points[0][1]);
      context.lineTo(points[1][0], points[1][1]);
      context.lineTo(points[2][0], points[2][1]);
      context.fill();
      context.stroke();
    };
    triangles.forEach(drawTriangle);
  }

  generate(howMany) { // eslint-disable-line max-statements
    const canvas = this.canvas;
    const size = this.props.size;
    const halfSize = size / 2;
    const triangles = [];
    let x = 0;
    let y = 0;
    let mirror = true;

    for(let i = 0; i <= howMany; i++) {
      const randomForColor = seedRandom(`${i}${this.props.seed}`);
      const color1 = Math.floor(randomForColor() * (250 - 215) + 215);
      const color2 = Math.floor(randomForColor() * (250 - 215) + 215);
      const rgb1 = `rgb(${color1}, ${color1}, ${color1})`;
      const rgb2 = `rgb(${color2}, ${color2}, ${color2})`;

      if (mirror) {
        triangles.push({
          color: rgb2,
          points: [
            [x, y],
            [x + halfSize, y + halfSize],
            [x - halfSize, y + halfSize]
          ]
        });
        triangles.push({
          color: rgb1,
          points: [
            [x, y],
            [x + halfSize, y + halfSize],
            [x + size, y]
          ]
        });
      }
      else {
        triangles.push({
          color: rgb2,
          points: [
            [x, y + halfSize],
            [x + halfSize, y],
            [x - halfSize, y]
          ]
        });
        triangles.push({
          color: rgb1,
          points: [
            [x, y + halfSize],
            [x + halfSize, y],
            [x + size, y + halfSize]
          ]
        });
      }

      x += size;

      if(x - halfSize >= canvas.clientWidth) {
        x = 0;
        y += halfSize;
        mirror = !mirror;
      }
    }

    return triangles;
  }

  fill() {
    const canvas = this.canvas;
    const size = this.props.size;
    const halfSize = size / 2;

    const canvasHeight = canvas.clientHeight;
    const canvasWidth = canvas.clientWidth;
    const rows = Math.ceil(canvasHeight / halfSize);
    const perRow = Math.ceil(canvasWidth / size + 1) * 2;
    const amount = rows * perRow / 2;

    const triangles = this.generate(amount);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.draw(triangles);
  }

  constructor(props) {
    super(props);
    this.limitedFillCanvas = debounce(() => this.fill(), 200);
  }

  componentDidMount() {
    this.context = this.canvas.getContext('2d');
    this.fill();
    window.addEventListener('resize', this.limitedFillCanvas, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.limitedFillCanvas, false);
  }

  render() {
    return (
      <div styleName="triangles">
        <canvas
          styleName="canvas"
          ref={ (ele) => {
            this.canvas = ele;
          } }
        />
      </div>
    );
  }
}
