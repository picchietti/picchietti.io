import React from 'react';
import { debounce } from 'lodash';

import './index.scss';

var Triangle = {
  size: 40,
  fill_height: 0,
  fill_width: 0,

  make: function(ele, direction, color, x, y){
    var tri = document.createElement('div');
    tri.className = direction;
    tri.style.borderWidth = Triangle.size + 'px';
    tri.style.left = x + 'px';
    tri.style.top = y + 'px';

    switch(direction){
      case 'up': tri.style.borderBottomColor = color;	break;
      case 'down': tri.style.borderTopColor = color;	break;
    }

    ele.appendChild(tri);
  },

  fill: function(ele){
    var batch = document.createElement('div');
    var color, rgb;
    var x = -Triangle.size;
    var y = 0;
    var up = true;
    var fill_height = ele.clientHeight;
    var fill_width = ele.clientWidth;

    if(Triangle.fill_height !== fill_height || Triangle.fill_width !== fill_width){
      // new dimensions, change
      Triangle.fill_height = fill_height;
      Triangle.fill_width = fill_width;
    }
    else{
      // same dimensions, dont change
      return;
    }


    var amount = Math.ceil(fill_height / Triangle.size) * (Math.ceil(fill_width / Triangle.size) + 1);

    for(var i=0; i <= amount; i++){
      color = Math.floor(Math.random() * (246 - 220) + 220);
      rgb = 'rgb(' + color + ', ' + color + ', ' + color + ')';

      if(up){
        var adjusted_y = y - Triangle.size;
        Triangle.make(batch, 'up', rgb, x, adjusted_y);
      }
      else{
        Triangle.make(batch, 'down', rgb, x, y);
      }

      x += Triangle.size;
      up = !up;

      if(x >= ele.clientWidth){
        x = -Triangle.size;
        y += Triangle.size;
      }
    }

    ele.innerHTML = '';
    ele.appendChild(batch);
  }
}

export default class Header extends React.Component {
  fillCanvas() {
    var canvas = document.getElementById('canvas');
    Triangle.fill(canvas);
  }

  componentDidMount() {
    this.fillCanvas();
    window.addEventListener('resize', debounce(this.fillCanvas, 300), false);
  }


  render() {
    return (
      <header className="no-print">
        <div id="canvas"></div>
        <div className="profile">
          <img src="/images/profile2.png" alt="Me" className="picture" />
        </div>
        <div className="wrap-centered">
          <div className="menu alignl">
            <div className="links">
              <div className="links-centered">
                <div><a href="https://github.com/picchietti" target="_blank" rel="noopener noreferrer"><i className="fa fa-fw fa-github"></i><span className="text"> Github</span></a></div>
                <div><a href="https://www.linkedin.com/in/picchietti/" target="_blank" rel="noopener noreferrer"><i className="fa fa-fw fa-linkedin-square"></i><span className="text"> LinkedIn</span></a></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
