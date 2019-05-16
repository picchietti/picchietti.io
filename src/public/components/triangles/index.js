import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash-es';
import seedRandom from 'seedrandom';

import './index.scss';

function Triangles(props) {
  const canvas = useRef(null);
  let context;

  function draw(triangles) {
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

  function generate(howMany) { // eslint-disable-line max-statements
    const size = props.size;
    const halfSize = size / 2;
    const triangles = [];
    let x = 0;
    let y = 0;
    let mirror = true;

    for(let i = 0; i <= howMany; i++) {
      const randomForColor = seedRandom(`${i}${props.seed}`);
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

      if(x - halfSize >= canvas.current.clientWidth) {
        x = 0;
        y += halfSize;
        mirror = !mirror;
      }
    }

    return triangles;
  }

  function fill() {
    const size = props.size;
    const halfSize = size / 2;

    const canvasHeight = canvas.current.clientHeight;
    const canvasWidth = canvas.current.clientWidth;
    const rows = Math.ceil(canvasHeight / halfSize);
    const perRow = Math.ceil(canvasWidth / size + 1) * 2;
    const amount = rows * perRow / 2;

    const triangles = generate(amount);

    canvas.current.width = canvasWidth;
    canvas.current.height = canvasHeight;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    draw(triangles);
  }


  const limitedFillCanvas = debounce(() => fill(), 200);

  useEffect(() => {
    context = canvas.current.getContext('2d');
    fill();
    window.addEventListener('resize', limitedFillCanvas, false);

    return () => {
      window.removeEventListener('resize', limitedFillCanvas, false);
    };
  });

  return (
    <div styleName="triangles" className="no-print">
      <canvas
        styleName="canvas"
        ref={ canvas }
      />
    </div>
  );
}

Triangles.propTypes = {
  size: PropTypes.number,
  seed: PropTypes.any
};

Triangles.defaultProps = {
  size: 80,
  seed: (new Date()).getTime()
};

export default Triangles;
