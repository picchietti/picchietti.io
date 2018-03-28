//need to check if its loading
export default class Loader {
	constructor() {
		this.loaded = [];
	}

	load(file, callback) {
		if(this.loaded[file] == true){
			callback();
			return;
		}

		var newScript = document.createElement('script');
		newScript.src = location.origin + '/' + file;

		newScript.onload = function(){
			callback();
			Loader.loaded[file] = true;
		}

		document.getElementsByTagName('head')[0].appendChild(newScript);
	}
}
