function $(id){
	return document.getElementById(id);
}

var BookMark={
	currentItem: false,
	moved: new Array(3),

	_make:function(folder,url,title,favicon){
		var mark = document.createElement("a");
		mark.style.backgroundImage = "url('/pages/bookmarks/icons/"+ favicon +"')";

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
		var mark = this._make(folder,url,title,favicon);
		mark.innerHTML = title;
		$("bookmarks").appendChild(mark);
	},

	makeBar:function(folder,url,title,favicon){
		var mark = this._make(folder,url,title,favicon);

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
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/bookmarks/add", true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send("url="+encodeURIComponent(url) + "&folder="+encodeURIComponent(Folders.current));

		xhr.onreadystatechange=function(){if(xhr.readyState == 4 && xhr.status == 200){
			var response = JSON.parse(xhr.responseText); //folder, url, title, icon
			if(response.length != 4)
				return;

			if(response[0] == Folders.current || response[0] == "Bookmark Bar")
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
		xhr.open("GET", "/bookmarks/get/"+encodeURIComponent(Folders.current)+'/'+amount, true);
		xhr.send(null);

		xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
			var response=JSON.parse(xhr.responseText); //url, title, icon
			for(var i=0,y=response.bar.length;i<y;i++)
				BookMark.makeBar("Bookmark Bar", response.bar[i].url, response.bar[i].title, response.bar[i].icon);

			for(var i=0,y=response.other.length;i<y;i++)
				BookMark.make("Other", response.other[i].url, response.other[i].title, response.other[i].icon);
		}}
	},

	getList:function(){
		var xhr = new XMLHttpRequest();
		var amount;
		Pager.total = amount = parseInt( (window.innerHeight - 42) / 26 ) + 5;
		xhr.open("GET", "/bookmarks/list/"+encodeURIComponent(Folders.current)+'/'+amount, false);
		xhr.send(null);

		var response = JSON.parse(xhr.responseText); //url, title, icon
		for(var i=0,y=response.length;i<y;i++)
			BookMark.make(Folders.current, response[i].url, response[i].title, response[i].icon);
	},

	getMore:function(amount){
		if(Pager.total == -1)
			return;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/bookmarks/more/"+encodeURIComponent(Folders.current)+'/'+amount+'/'+Pager.total, false);
		xhr.send(null);

		var response = JSON.parse(xhr.responseText); //url, title, icon
		if(response.length == 0){
			Pager.total = -1;
			return;
		}
		for(var i=0,y=response.length;i<y;i++)
			BookMark.make(Folders.current, response[i].url, response[i].title, response[i].icon);

		Pager.total += amount;
	},

	newTab:function(){
		window.open(BookMark.currentItem.href, '_blank');
	},

	move:function(from, to){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/bookmarks/move", false);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send("from="+encodeURIComponent(from.url)+"&to="+encodeURIComponent(to.url));
	},

	remove:function(){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/bookmarks/delete", false);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send("url=" + BookMark.getUrl());
		if(xhr.status === 200)
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

		if(title != BookMark.currentItem.innerHTML)
			post+="name="+encodeURIComponent(title);

		if(url!=BookMark.currentItem.url)
			post+=((post!="")?'&':"")+"url="+encodeURIComponent(url);

		if(post!="update.php?"){
			post+="&oldurl="+BookMark.getUrl();
			xhr.open("PUT", "/bookmarks/update", false);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
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

var Pager = {
	total: 0,

	scrollCheck: function(){
		//firefox wants document.documentElement and chrome wants document.body.
		var doc = (document.documentElement.scrollTop!=0) ? document.documentElement : document.body;
		var h = doc.scrollHeight;
		var t = doc.scrollTop;

		var w = parseInt(window.innerHeight);
		if((h - (t + w)) == 0)
			BookMark.getMore(15);
	}
};

var Folders = {
	current: "Other",
	all: [],

	getAll: function(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/bookmarks/folders", false);
		xhr.send(null);

		var response = JSON.parse(xhr.responseText);
		Folders.all = response;

		Folders.build();
	},

	build: function(){
		for(var i=0, y=Folders.all.length; i<y; i++){
			var div = document.createElement("div");
			div.className = "folder";
			div.innerHTML = Folders.all[i];

			if(Folders.all[i] == localStorage.folder)
				div.id = "currentF";

			div.onclick=function(){
				if(Folders.current != this.innerHTML){
					$("bookmarks").innerHTML = "";
					$("selected-folder").innerHTML = this.innerHTML;
					Folders.current = this.innerHTML;
					if($("currentF"))
						$("currentF").id = null;
					this.id = "currentF";
					BookMark.getList();

					localStorage.folder = this.innerHTML;
				}
			}

			$("folders").appendChild(div);
		}
	}
}

function load(){
	if(localStorage.folder){
		Folders.current = localStorage.folder;
		$("selected-folder").innerHTML = localStorage.folder;
	}

	Folders.getAll();

	BookMark.getAll();

	document.addEventListener("scroll", Pager.scrollCheck, false);

	var input=$('global');
	input.onkeydown=function(e){
		if(e.keyCode==13 && this.value!=""){
			BookMark.add(this.value);
		}
	}

	input.focus();
}

function addFolder(){
	var f = prompt("Name of the new folder");
	if(f == null)
		return;

	$("bookmarks").innerHTML = "";
	if($("currentF"))
		$("currentF").id = null;


	Folders.current = f;
	$("selected-folder").innerHTML = f;
	localStorage.folder = f;
}

function togglePopup(){
	var popup = $('popup')
	if(popup.style.display != "flex")
		popup.style.display = "flex";
	else
		popup.style.display = "none";
}

window.addEventListener('load', load, false);