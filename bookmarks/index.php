<?php require("cred.php"); ?>
<!DOCTYPE html><html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Jon's Bookmarks</title>
<meta name=viewport content="width=device-width, initial-scale=1" />
<link rel="shortcut icon" href="/favicon.png" />
<link rel="stylesheet" href="/css/bookmarks.css" />
<script>
function $(id){
	return document.getElementById(id);
}

var BookMark={
	curFolder: "Other",
	currentItem: false,
	moved: new Array(3),
	folders: <?php include("include_folders.txt"); ?>,

	makeMark:function(folder,url,title,favicon){
		var mark = document.createElement("a");
		mark.style.backgroundImage = "url('/bookmarks/icons/"+ favicon +"')";

		mark.addEventListener("contextmenu", function(event) {
			event.preventDefault();
			$("edit").style.display = "none";
			BookMark.currentItem = this;
			var contextdiv = $("menu");
			contextdiv.style.display = "block";

			var top = this.offsetTop + this.clientHeight;
			if(top + contextdiv.clientHeight > window.innerHeight + window.scrollY)
				top = top - contextdiv.clientHeight;
			contextdiv.style.top = top + "px";

			var left = event.pageX + window.scrollX - 6;
			if(left + contextdiv.clientWidth > window.innerWidth + window.scrollX)
				left = left - (left + contextdiv.clientWidth - window.innerWidth + 4);
			contextdiv.style.left = left + "px";

			document.addEventListener("click", function clearmenu(event){
				if(event.which == 1){
					$("menu").style.display = "none";
					document.removeEventListener("click", clearmenu, false);
				}
			}, false);
		}, true);

		mark.href = url;
		mark.url = url; //don't want browser to reformat the url automatically!

		return mark;
	},

	make:function(folder,url,title,favicon){
		var mark = this.makeMark(folder,url,title,favicon);
		mark.innerHTML = title;
		$("bookmarks").appendChild(mark);
	},

	makeBar:function(folder,url,title,favicon){
		var mark = this.makeMark(folder,url,title,favicon);

		mark.title = title + "\n" + url;

		mark.addEventListener('dragstart',function(event){event.preventDefault();},false);

		mark.onmousedown=function(event){
			document.onselectstart=function(){return false;}
			startprev = mark.previousSibling;
			marksBoxX = $("bar").offsetLeft;
			marksBoxY = $("bar").offsetTop;
			window.addEventListener("mousemove", mark.mousemove, false);
			window.addEventListener("mouseup", mark.mouseup, false);
		}

		mark.mousemove=function(event){
			var nextEle, prevEle;
			var mouseRelParentX = event.pageX - marksBoxX;
			var mouseRelParentY = event.pageY - marksBoxY;

			if(document.elementFromPoint(event.clientX,event.clientY)==null || mark.parentNode!=document.elementFromPoint(event.clientX,event.clientY).parentNode)
				return;

			if(mark.previousSibling!=null && mouseRelParentX<(prevEle=mark.offsetLeft-mark.previousSibling.offsetWidth/3)){
				var it=document.elementFromPoint(prevEle,event.clientY);
				$("bar").insertBefore(mark,it);
				BookMark.moved[0] = true;
				BookMark.moved[1] = mark;
				BookMark.moved[2] = it;
			}
			else if(mark.nextSibling!=null && mouseRelParentX>(nextEle=mark.offsetLeft+mark.offsetWidth+mark.nextSibling.offsetWidth/3)){
				var it=document.elementFromPoint(nextEle,event.clientY);
				$("bar").insertBefore(mark,it.nextSibling);
				BookMark.moved[0] = true;
				BookMark.moved[1] = mark;
				BookMark.moved[2] = it;
			}

			if(mark.previousSibling!=null && mouseRelParentY<(prevEle=mark.offsetTop-mark.previousSibling.offsetHeight/4)){
				var it=document.elementFromPoint(event.clientX,prevEle);
				$("bar").insertBefore(mark,it);
				BookMark.moved[0] = true;
				BookMark.moved[1] = mark;
				BookMark.moved[2] = it;
			}
			else if(mark.nextSibling!=null && mouseRelParentY>(nextEle=mark.offsetTop+mark.offsetHeight+mark.nextSibling.offsetHeight/4)){
				var it=document.elementFromPoint(event.clientX,nextEle);
				$("bar").insertBefore(mark,it.nextSibling);
				BookMark.moved[0] = true;
				BookMark.moved[1] = mark;
				BookMark.moved[2] = it;
			}
		}

		mark.mouseup=function(){
			document.onselectstart=function(){return true;}

			if(startprev != mark.previousSibling){
				if(BookMark.moved[0]){
					BookMark.move(BookMark.moved[1], BookMark.moved[2])
					BookMark.moved[0] = false;
				}
			}

			window.removeEventListener("mousemove", mark.mousemove, false);
			window.removeEventListener("mouseup", mark.mouseup, false);
		}

		$("bar").appendChild(mark);
	},

	add:function(url){
		var xhr=new XMLHttpRequest();
		xhr.open("POST", "add.php", true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send("url="+encodeURIComponent(url)+"&folder="+encodeURIComponent(this.curFolder));

		xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
			var response=JSON.parse(xhr.responseText); //folder, url, title, icon
			if(response.length!=4) return;
			if(response[0]==BookMark.curFolder || response[0]=="Bookmark Bar")
				BookMark.make(response[0], response[1], response[2], response[3]);
			$("global").value = "";
		}}
	},

	getUrl:function(){
		return encodeURIComponent(BookMark.currentItem.url);
	},

	getAll:function(){
		var xhr = new XMLHttpRequest();
		var amount;
		Pager.total = amount = parseInt((window.innerHeight - 42) / 26) + 5;
		xhr.open("GET", "get.php?amount="+amount+"&folder="+encodeURIComponent(this.curFolder), true);
		xhr.send(null);

		xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
			var response=JSON.parse(xhr.responseText); //url, title, icon
			for(var i=0,y=response.bar.url.length;i<y;i++){
				BookMark.makeBar("Bookmark Bar", response.bar.url[i], response.bar.title[i], response.bar.icon[i]);
			}
			for(var i=0,y=response.other.url.length;i<y;i++){
				BookMark.make("Other", response.other.url[i], response.other.title[i], response.other.icon[i]);
			}
		}}
	},

	getList:function(){
		var xhr = new XMLHttpRequest();
		var amount;
		Pager.total = amount = parseInt((window.innerHeight-42)/26)+5;
		xhr.open("GET", "getList.php?amount="+amount+"&folder="+encodeURIComponent(this.curFolder), false);
		xhr.send(null);

		var response = JSON.parse(xhr.responseText); //url, title, icon
		for(var i=0,y=response.url.length;i<y;i++){
				BookMark.make(BookMark.curFolder, response.url[i], response.title[i], response.icon[i]);
		}
	},

	getMore:function(amount){
		if(Pager.total == -1)
			return;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "more.php?amount="+amount+"&total="+Pager.total+"&folder="+encodeURIComponent(BookMark.curFolder), false);
		xhr.send(null);

		var response = JSON.parse(xhr.responseText); //url, title, icon
		if(response == null){
			Pager.total = -1;
			return;
		}
		for(var i=0,y=response.other.url.length;i<y;i++)
			BookMark.make(BookMark.curFolder, response.other.url[i], response.other.title[i], response.other.icon[i]);

		Pager.total += amount;
	},

	newTab:function(){
		window.open(BookMark.currentItem.href, '_blank');
	},

	move:function(from, to){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "move.php", false);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send("from="+encodeURIComponent(from.url)+"&to="+encodeURIComponent(to.url));
	},

	remove:function(){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "remove.php", false);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send("url=" + BookMark.getUrl());
		if(xhr.responseText == "1")
			BookMark.currentItem.parentNode.removeChild(BookMark.currentItem);
	},

	edit:function(){
		var edit = $("edit");
		var inputs = edit.getElementsByTagName("input");
		var menuLeft = $("menu").style.left.split("px")[0];
		inputs[0].value = BookMark.currentItem.url;
		if(BookMark.currentItem.parentNode.id=="bar")
			inputs[1].value = BookMark.currentItem.title.split("\n")[0];
		else
			inputs[1].value = BookMark.currentItem.innerHTML;

		edit.style.display = "flex";
	},

	update:function(){
		var xhr = new XMLHttpRequest();
		var post = "";
		var inputs = $("edit").getElementsByTagName("input");
		var url = inputs[0].value;
		var title = inputs[1].value;

		if(title! = BookMark.currentItem.innerHTML)
			post+="name="+encodeURIComponent(title);

		if(url!=BookMark.currentItem.url)
			post+=((post!="")?'&':"")+"url="+encodeURIComponent(url);

		if(post!="update.php?"){
			post+="&oldurl="+BookMark.getUrl();
			xhr.open("POST", "update.php", false);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send(post);
			BookMark.currentItem.href = url;
			if(BookMark.currentItem.parentNode.id == "bar")
				BookMark.currentItem.title = title+'\n'+url;
			else
				BookMark.currentItem.innerHTML = title;
		}

		$("edit").style.display = "none";
	}
}

var Pager={
	total:0,

	scrollCheck:function(){
		//firefox wants document.documentElement and chrome wants document.body.
		var doc = (document.documentElement.scrollTop!=0) ? document.documentElement : document.body;
		var h = doc.scrollHeight;
		var t = doc.scrollTop;

		var w = parseInt(window.innerHeight);
		if((h - (t + w)) == 0)
			BookMark.getMore(15);
	}

};

function load(){
	if(localStorage.folder)
		BookMark.curFolder = localStorage.folder;
		$("selected-folder").innerHTML = localStorage.folder;

	BookMark.getAll();

	document.addEventListener("scroll",Pager.scrollCheck,false);

	var input=$('global');
	input.onkeydown=function(e){
		if(e.keyCode==13 && this.value!=""){
			BookMark.add(this.value);
		}
	}

	for(var i=0,y=BookMark.folders.length;i<y;i++){
		var div = document.createElement("div");
		div.className = "folder";
		div.innerHTML = BookMark.folders[i];

		if(BookMark.folders[i] == localStorage.folder)
			div.id = "currentF";

		div.onclick=function(){
			if(BookMark.curFolder != this.innerHTML){
				$("bookmarks").innerHTML = "";
				$("selected-folder").innerHTML = this.innerHTML;
				BookMark.curFolder = this.innerHTML;
				if($("currentF"))
					$("currentF").id = null;
				this.id = "currentF";
				BookMark.getList();

				localStorage.folder = this.innerHTML;
			}
		}

		$("folders").appendChild(div);
	}

	input.focus();
}

function addFolder(){
	var f = prompt("Name of the new folder");
	if(f == null)
		return;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "add_folder.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("f=" + encodeURIComponent(f));
}

function togglePopup(){
	var popup = $('popup')
	if(popup.style.display != "flex")
		popup.style.display = "flex";
	else
		popup.style.display = "none";
}

window.addEventListener('load', load, false);
</script>
</head>
<body>
<div id="bar"></div>

<div id="controls">
	<div id="choose-folder" class="no-select-all" onclick="togglePopup()"><img src="folder.png" alt="folder" /><span id="selected-folder">Select Folder</span></div>
	<input type="text" id="global" placeholder="Enter Website URL..." />
</div>

<div id="bookmarks"></div>

<div id="popup" class="popup" onclick="togglePopup();">
	<div class="modal">
		<div id="folderCol"><img src="folder.png" alt="folder" /> Folders</div>
		<input type="button" value="+" id="folder-add" onclick="addFolder();" />
		<div id="folders"></div>
	</div>
</div>

<div id="edit" class="popup">
	<div class="modal">
		<p>Url</p>
		<input type="text" placeholder="Bookmark URL" />
		<p>Title</p>
		<input type="text" placeholder="Bookmark Name" />
		<p style="text-align:center;">
			<input type="button" value="Change" onclick="BookMark.update();" />
			<input type="button" value="Close" onclick="this.parentNode.parentNode.parentNode.style.display='none';" />
		</p>
	</div>
</div>

<div id="menu">
	<div onclick="BookMark.newTab()">Open link in new tab</div>
	<hr class="divider" />
	<div onclick="BookMark.edit()">Edit...</div>
	<hr class="divider" />
	<div onclick="BookMark.remove()" style="font-weight:bold;">Delete</div>
</div>

</body></html>
