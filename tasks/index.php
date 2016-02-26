<?php require("cred.php"); ?>
<!DOCTYPE html>
<html>
<head>
<title>Jon's To-Do</title>
@@include('../includes/head.php')
<style>
#global{font-size:16pt;width:90%;margin-bottom: 15px;}
.overlay{position:absolute;width:100%;height:100%;left:0px;top:0px;font-family:inherit;font-size:inherit;resize:none;padding:0;}
#list{width:100%;border-spacing:4px;}
#list .check{cursor:pointer;margin-right:10px;color:#666;}
#list .check:hover{color:#000;}
</style>
<script>
var Task={

add:function(task){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "add.php", true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("task="+encodeURIComponent(task));

	xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
		$('global').value = "";
		Task.make(xhr.reponseText,task);
	}}
},

check:function(task){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "delete.php", true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("task="+encodeURIComponent(task.nextSibling.innerHTML));

	xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
		task.parentNode.parentNode.removeChild(task.parentNode);
	}}
},

make:function(id,task){
	var list = $("list");
	var item = document.createElement("div");
	var about = document.createElement("span");

	var check = document.createElement("i");
	check.className = "check fa fa-check";
	check.addEventListener("click",function(){Task.check(this)},false);

	item.id = id;
	item.className = 'no-select'
	item.style.position = "relative";

	about.innerHTML += task.replace("<","&lt;").replace(">","&gt;");
	about.addEventListener("click",function(){
		var textarea = document.createElement("textarea");
		textarea.className = "overlay";
		textarea.value = this.innerHTML;
		textarea.addEventListener("click", function(event){event.stopPropagation();}, false);
		textarea.onkeydown=function(e){
			if(e.keyCode==13){
				var changed = this.value;
				Task.edit(this.parentNode.parentNode.id,changed);
				this.parentNode.innerHTML = changed.replace("<","&lt;").replace(">","&gt;");
			}
		}
		this.appendChild(textarea);
		textarea.focus();
	}, false);

	item.appendChild(check);
	item.appendChild(about);
	list.insertBefore(item,list.firstChild);
},

edit:function(id,replaced){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "edit.php", true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("replaced="+encodeURIComponent(replaced)+"&id="+id);
},

getAll:function(){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "getAll.php", true);
	xhr.send(null);

	xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
		var response=JSON.parse(xhr.responseText);

		for(var i=0,y=response["id"].length;i<y;i++){
			Task.make(response["id"][i],response["task"][i]);
		}
	}}
}

};


function load(){
	var input = $('global');
	input.onkeydown=function(e){
		if(e.keyCode==13 && this.value!=""){
			Task.add(this.value);
		}
	}

	Task.getAll();
	input.focus();
}

window.addEventListener('load',load,false);

</script>
</head>
<body>
@@include('../includes/header.php')
<div id="content">
	<div style="text-align:center;">
		<input type="text" id="global" placeholder="To do..." />
	</div>

	<div id="list"></div>
	<div id="pushfoot"></div>
</div>

@@include('../includes/footer.php')
</body></html>
