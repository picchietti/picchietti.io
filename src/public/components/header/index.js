import React from 'react';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';
import profile from './images/profile2.png';

const Triangle = {
  size: 40,
  fillHeight: 0,
  fillWidth: 0,

  make: function(ele, direction, color, x, y) {
    const tri = document.createElement('div');
    tri.className = direction;
    tri.style.borderWidth = `${Triangle.size}px`;
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
  },

  fill: function(ele) { // eslint-disable-line max-statements
    const batch = document.createElement('div');
    let color, rgb;
    let x = -Triangle.size;
    let y = 0;
    let up = true;
    const fillHeight = ele.clientHeight;
    const fillWidth = ele.clientWidth;

    if(Triangle.fillHeight !== fillHeight || Triangle.fillWidth !== fillWidth) {
      // new dimensions, change
      Triangle.fillHeight = fillHeight;
      Triangle.fillWidth = fillWidth;
    }
    else{
      // same dimensions, dont change
      return;
    }


    const amount = Math.ceil(fillHeight / Triangle.size) * (Math.ceil(fillWidth / Triangle.size) + 1);

    for(let i = 0; i <= amount; i++) {
      color = Math.floor(Math.random() * (246 - 220) + 220);
      rgb = `rgb(${color}, ${color}, ${color})`;

      if(up) {
        const adjustedY = y - Triangle.size;
        Triangle.make(batch, 'up', rgb, x, adjustedY);
      }
      else{
        Triangle.make(batch, 'down', rgb, x, y);
      }

      x += Triangle.size;
      up = !up;

      if(x >= ele.clientWidth) {
        x = -Triangle.size;
        y += Triangle.size;
      }
    }

    ele.innerHTML = '';
    ele.appendChild(batch);
  }
};

export default class Header extends React.Component {
  static fillCanvas() {
    const canvas = document.getElementById('canvas');
    Triangle.fill(canvas);
  }

  componentDidMount() {
    Header.fillCanvas();
    window.addEventListener('resize', debounce(Header.fillCanvas, 300), false);
  }


  render() {
    return (
      <header className="no-print">
        <div id="canvas"></div>
        <div styleName="profile">
          <img src={profile} alt="Me" styleName="picture" />
        </div>
        <div className="wrap-centered">
          <div styleName="menu" className="alignl">
            <div styleName="links">
              <div styleName="links-centered">
                <div><a href="https://github.com/picchietti" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={ ['fab', 'github'] } fixedWidth /><span styleName="text"> Github</span></a></div>
                <div><a href="https://www.linkedin.com/in/picchietti/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={ ['fab', 'linkedin'] } fixedWidth /><span styleName="text"> LinkedIn</span></a></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
