var Task = {

add:function(task){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/tasks/add', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send('task=' + encodeURIComponent(task));

	xhr.onreadystatechange=function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			$('global').value = '';
			Task.make(xhr.reponseText, task);
		}
}
},

check:function(task){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/tasks/delete', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send('task=' + encodeURIComponent(task.nextSibling.innerHTML));

	xhr.onreadystatechange=function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			task.parentNode.parentNode.removeChild(task.parentNode);
		}
	}
},

make:function(id,task){
	var tasks = $('tasks');
	var item = document.createElement('div');
	var about = document.createElement('div');

	var check = document.createElement('i');
	check.className = 'check fa fa-check';

	item.id = id;
	item.className = 'item no-select';

	about.innerHTML += task.replace('<','&lt;').replace('>','&gt;');
	about.className = 'about';

  about.pointer_down = function(event){
    this.startX = event.clientX || event.touches.item(0).clientX;
    document.addEventListener('mousemove', about.point_move, false);
    document.addEventListener('mouseup', about.pointer_up, false);
    document.addEventListener('touchmove', about.point_move, false);
    document.addEventListener('touchend', about.pointer_up, false);

    // event.preventDefault();
	}

  about.point_move = function(event){
    var quarter_width = about.clientWidth * 0.25;
    var clientX = event.clientX || event.touches.item(0).clientX;
    var diff = clientX - about.startX;
    about.style.left = Math.max(0, diff) + 'px';
    if(diff >= quarter_width)
      check.classList.add('deleting');
    else
      check.classList.remove('deleting');

    event.preventDefault();
  }

  about.pointer_up = function(event){
		if(event.touches && event.touches.length > 0)
			return; // haven't released all fingers from target

		document.removeEventListener('mousemove', about.point_move, false);
    document.removeEventListener('mouseup', about.pointer_up, false);
    document.removeEventListener('touchmove', about.pointer_up, false);
    document.removeEventListener('touchend', about.pointer_up, false);

    var quarter_width = about.clientWidth * 0.25;
    var clientX = event.clientX || event.changedTouches.item(0).clientX;
    var diff = clientX - about.startX;
    if(diff >= quarter_width){
      Task.check(check);
      return;
    }
    else if(Math.abs(diff) <= 3){ // for when it is 'clicked'
      var textarea = document.createElement('textarea');
  		textarea.className = 'overlay';
  		textarea.value = about.innerHTML;
			// dont let the events bubble up to the about.
  		textarea.addEventListener('mousedown', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('mousemove', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('mouseup', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('touchstart', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('touchmove', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('touchend', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('keydown', function(e){
  			if(e.keyCode == 13){ // press enter
  				var changed = this.value;
  				Task.edit(this.parentNode.parentNode.id, changed);
  				this.parentNode.innerHTML = changed.replace('<','&lt;').replace('>','&gt;');
  			}
				else if(e.keyCode == 27){ // press esc(ape)
					textarea.parentNode.removeChild(textarea);
				}
  		}, false);
  		about.appendChild(textarea);
  		textarea.focus();
    }

    about.style.left = "0px";

    event.preventDefault();
  }

	about.addEventListener('mousedown', about.pointer_down, false);
	about.addEventListener('touchstart', about.pointer_down, false);

	item.appendChild(check);
	item.appendChild(about);
	tasks.insertBefore(item, tasks.firstChild);
},

edit:function(id,replaced){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/tasks/edit', true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send('replaced=' + encodeURIComponent(replaced) + '&id=' + id);
},

getAll:function(){
	var xhr = new XMLHttpRequest();

	xhr.open('GET', '/tasks/list', true);
	xhr.send(null);

	xhr.onreadystatechange=function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var response = JSON.parse(xhr.responseText);

			for(var i=0,y=response.length;i<y;i++){
				var task = response[i];
				Task.make(task.id, task.task);
			}
		}
	}
}

};

function load(){
	var input = $('global');
	input.onkeydown=function(e){
		if(e.keyCode == 13 && this.value != ''){
			Task.add(this.value);
		}
	}

	Task.getAll();
}

window.addEventListener('load', load, false);
