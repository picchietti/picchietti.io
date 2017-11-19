var num = 0;
var last_input;

function another(){
 	// use the unused file input instead of creating another.
	if(last_input != null && last_input.value == ''){
		last_input.click();
		return;
	}

	var input = document.createElement("input");
	input.type = "file";
	input.name = "file" + (++num);
	input.addEventListener("change", function(){
		imagePreview(this);
		var formData = new FormData();

		formData.append(this.name, this.files[0]);

		var xhr2 = new XHR2('POST', '/upload/file');
		xhr2.onload = function(){
			document.getElementById('uploads').removeChild(input);
			setTimeout(function(){
				document.getElementById('previews').removeChild(document.getElementById(input.name));
			}, 700);
		}

		xhr2.send(formData);
		another();
	}, false);
	last_input = input;
	document.getElementById("uploads").appendChild(input);
	input.click();
}

function imagePreview(input){
	if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(event){
			console.log('input', input.value);
			var ext = input.value.substring(input.value.lastIndexOf('.') + 1);
			console.log('ext', ext);
			switch(ext){
				case 'jpg': case 'gif': case 'png':
					var preview = document.createElement('img');
					preview.className = 'preview';
					preview.src = event.target.result;
					preview.id = input.name;
				break;
				default:
					var preview = document.createElement('div');
					preview.className = 'preview not-image';
					preview.innerHTML = '<i class="fa fa-2x fa-file-text-o"></i>'
					preview.id = input.name;
			}
      document.getElementById('previews').appendChild(preview);
    }

    reader.readAsDataURL(input.files[0]);
	}
}

function clickDropArea(){
	document.getElementById('droparea').addEventListener('click', function(){
		another();
	}, false);
}

function checkEnter(event){
	if(event.keyCode == 13){
		var url = document.getElementById("url");
		var xhr2 = new XHR2('POST', '/upload/url');
		xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr2.onload = function(){
			url.value = "";
		}
		xhr2.send("url=" + url.value);
	}
}

window.addEventListener("dragenter",function(event){
	document.body.classList.add('dragging');
	event.preventDefault();
}, false);
window.addEventListener("dragover",function(event){
	event.preventDefault();
}, false);
window.addEventListener("dragleave",function(event){
	document.body.classList.remove('dragging');
	event.preventDefault();
}, false);
window.addEventListener("drop",function(event){
	event.preventDefault();
	var files = event.dataTransfer.files;
	if(files.length > 0){ //wants to upload file(s) instead of drop another html element.
		var formData = new FormData();
		formData.append("path", this.path);
		for(var i=0,y=files.length;i<y;i++){
			formData.append('drop' + i, files[i]);
		}

		var xhr2 = new XHR2('POST', '/upload/file');

		xhr2.onload = function(){
			if(xhr2.status === 204){
				document.body.classList.remove('dragging');
			}
		};

		xhr2.send(formData);
	}
}, false);

window.addEventListener("DOMContentLoaded", clickDropArea, false);
