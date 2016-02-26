var Loader={
	//need to check if its loading
	loaded:[],
	load:function(file,fx){
		for(var i=0,y=this.loaded.length;i<y;i++){if(this.loaded[i]==file){eval(fx);return;}}
		var newScript=document.createElement("script");
		newScript.src=location.protocol+"//www.jonpicchietti.com/"+file;
		newScript.onload=function(){eval(fx);Loader.loaded.push(file);}
		document.getElementsByTagName("head")[0].appendChild(newScript);
	}
}