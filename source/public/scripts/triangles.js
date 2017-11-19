var Triangle = {
  size: 40,

  draw: function(ele, direction, color, x, y){
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
    ele.innerHTML = '';
    var color, rgb;
    var x = -Triangle.size;
    var y = 0;
    var up = true;
    var triangles = Math.ceil(ele.clientHeight / Triangle.size) * (Math.ceil(ele.clientWidth / Triangle.size) + 1);

    for(var i=0; i <= triangles; i++){
      color = Math.floor(Math.random() * (246 - 220) + 220);
      rgb = 'rgb(' + color + ', ' + color + ', ' + color + ')';

      if(up){
        var adjusted_y = y - Triangle.size;
        Triangle.draw(ele, 'up', rgb, x, adjusted_y);
      }
      else{
        Triangle.draw(ele, 'down', rgb, x, y);
      }

      x += Triangle.size;
      up = !up;

      if(x >= ele.clientWidth){
        x = -Triangle.size;
        y += Triangle.size;
      }
    }
  }
}

function fillCanvas(){
  var canvas = document.getElementById('canvas');
  Triangle.fill(canvas);
}

window.addEventListener('DOMContentLoaded', fillCanvas, false);
window.addEventListener('resize', _.debounce(fillCanvas, 300), false)
