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

	var hammer_swipe = new Hammer(about);
	var hammer_scroll = new Hammer(tasks, {
		touchAction: 'auto',
		threshold: 15,
		recognizers: [
			[Hammer.Pan,{ direction: Hammer.DIRECTION_VERTICAL }],
		]
	});

	hammer_scroll.on('panstart', function(event){
		if(hammer_scroll.locked){
			event.preventDefault();
			return;
		}
		hammer_swipe.locked = true;
	});

	hammer_scroll.on('panend', function(event){
		if(hammer_scroll.locked){
			event.preventDefault();
			return;
		}
		hammer_swipe.locked = false;
	});

	about.innerHTML += task.replace('<','&lt;').replace('>','&gt;');
	about.className = 'about';

	hammer_swipe.on('tap', function(event){
		var textarea = document.createElement('div');
		textarea.className = 'overlay';
		textarea.setAttribute('contenteditable', 'true');
		textarea.innerHTML = about.innerHTML;
		textarea.cached_text = about.innerHTML;
		// dont let the events bubble up to the about.
		textarea.addEventListener('mousedown', function(event){event.stopPropagation();}, false);
		textarea.addEventListener('mousemove', function(event){event.stopPropagation();}, false);
		textarea.addEventListener('mouseup', function(event){event.stopPropagation();}, false);
		textarea.addEventListener('touchstart', function(event){event.stopPropagation();}, false);
		textarea.addEventListener('touchmove', function(event){event.stopPropagation();}, false);
		textarea.addEventListener('touchend', function(event){event.stopPropagation();}, false);
		textarea.addEventListener('keydown', function(event){
			if(event.keyCode == 13){ // press enter
				if(this.innerHTML == this.cached_text){
					event.preventDefault();
					item.removeChild(this);
					return;
				}
				var changed = this.innerHTML;
				Task.edit(this.parentNode.id, changed);
				item.removeChild(this);
			}
			else if(event.keyCode == 27){ // press esc(ape)
				about.innerHTML = this.cached_text
				item.removeChild(this);
			}
		}, false);
		textarea.addEventListener('keyup', function(e){
			about.innerHTML = this.innerHTML.replace('<','&lt;').replace('>','&gt;');;
		}, false);
		item.appendChild(textarea);
		textarea.focus();
	});

	hammer_swipe.on('panstart', function(event){
		hammer_scroll.locked = true;
		document.onselectstart=function(){return false;};
	});

  hammer_swipe.on('panmove', function(event){
		if(hammer_swipe.locked){
			return;
		}
    var quarter_width = about.clientWidth * 0.25;
		var diff = event.deltaX;
    about.style.left = Math.max(0, diff) + 'px';
    if(diff >= quarter_width)
      check.classList.add('deleting');
    else
      check.classList.remove('deleting');
  });

  hammer_swipe.on('panend', function(event){
		if(hammer_swipe.locked){
			hammer_swipe.locked = false;
			return;
		}
    var quarter_width = about.clientWidth * 0.25;
		var diff = event.deltaX;
    if(diff >= quarter_width){
      Task.check(check);
      return;
    }

    about.style.left = "0px";
		hammer_scroll.locked = false;
		document.onselectstart=function(){return true;};
  });

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

	xhr.onreadystatechange = function(){
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
	input.onkeydown = function(e){
		if(e.keyCode == 13 && this.value != ''){
			Task.add(this.value);
		}
	}

	Task.getAll();
}

window.addEventListener('load', load, false);
