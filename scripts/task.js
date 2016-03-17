var Task={

add:function(task){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'add.php', true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send('task=' + encodeURIComponent(task));

	xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
		$('global').value = '';
		Task.make(xhr.reponseText,task);
	}}
},

check:function(task){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'delete.php', true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send('task='+encodeURIComponent(task.nextSibling.innerHTML));

	xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
		task.parentNode.parentNode.removeChild(task.parentNode);
	}}
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

  about.mouse_down = function(event){
    this.startX = event.clientX || event.touches.item(0).clientX;
    document.addEventListener('mousemove', about.mouse_move, false);
    document.addEventListener('mouseup', about.mouse_up, false);
    document.addEventListener('touchmove', about.mouse_move, false);
    document.addEventListener('touchend', about.mouse_up, false);
    document.onselectstart = function(){return false;};

    event.preventDefault();
	}

  about.mouse_move = function(event){
    var half_width = about.clientWidth * 0.25;
    var clientX = event.clientX || event.touches.item(0).clientX;
    var diff = clientX - about.startX;
    about.style.left = Math.max(0, diff) + 'px';
    if(diff >= half_width)
      check.classList.add('deleting');
    else
      check.classList.remove('deleting');

    event.preventDefault();
  }

  about.mouse_up = function(event){
    document.removeEventListener('mousemove', about.mouse_move, false);
    document.removeEventListener('mouseup', about.mouse_up, false);
    document.removeEventListener('touchmove', about.mouse_up, false);
    document.removeEventListener('touchend', about.mouse_up, false);
    document.onselectstart = function(){return true;};
    var half_width = about.clientWidth * 0.25;
    var clientX = event.clientX || event.changedTouches.item(0).clientX;
    var diff = clientX - about.startX;
    if(diff >= half_width){
      Task.check(check);
      return;
    }
    else if(Math.abs(diff) <= 3){
      var textarea = document.createElement('textarea');
  		textarea.className = 'overlay';
  		textarea.value = about.innerHTML;
  		textarea.addEventListener('mousedown', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('mousemove', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('mouseup', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('touchstart', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('touchmove', function(event){event.stopPropagation();}, false);
  		textarea.addEventListener('touchend', function(event){event.stopPropagation();}, false);
  		textarea.onkeydown=function(e){
  			if(e.keyCode==13){
  				var changed = this.value;
  				Task.edit(this.parentNode.parentNode.id, changed);
  				this.parentNode.innerHTML = changed.replace('<','&lt;').replace('>','&gt;');
  			}
  		}
  		about.appendChild(textarea);
  		textarea.focus();
    }

    about.style.left = "0px";

    event.preventDefault();
  }

	about.addEventListener('mousedown', about.mouse_down, false);
	about.addEventListener('touchstart', about.mouse_down, false);

	item.appendChild(check);
	item.appendChild(about);
	tasks.insertBefore(item, tasks.firstChild);
},

edit:function(id,replaced){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'edit.php', true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send('replaced='+encodeURIComponent(replaced)+'&id='+id);
},

getAll:function(){
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'getAll.php', true);
	xhr.send(null);

	xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
		var response = JSON.parse(xhr.responseText);

		for(var i=0,y=response['id'].length;i<y;i++){
			Task.make(response['id'][i],response['task'][i]);
		}
	}}
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

window.addEventListener('load',load,false);
