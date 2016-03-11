var Loader={
	//need to check if its loading
	loaded: [],
	load:function(file, callback){
		if(this.loaded[file] == true){
			callback();
			return;
		}

		var newScript = document.createElement("script");
		newScript.src = location.protocol+'//www.jonpicchietti.com/'+file;

		newScript.onload=function(){
			callback();
			Loader.loaded[file] = true;
		}

		document.getElementsByTagName('head')[0].appendChild(newScript);
	}
}
