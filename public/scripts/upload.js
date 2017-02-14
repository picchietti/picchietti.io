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

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/upload/file", true);
		xhr.onload = function(){
			$('uploads').removeChild(input);
			setTimeout(function(){
				$('previews').removeChild($(input.name));
			}, 700);
		}

		xhr.send(formData);
		another();
	}, false);
	last_input = input;
	$("uploads").appendChild(input);
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
      $('previews').appendChild(preview);
    }

    reader.readAsDataURL(input.files[0]);
	}
}

function clickDropArea(){
	$('droparea').addEventListener('click', function(){
		another();
	}, false);
}

function checkEnter(event){
	if(event.keyCode == 13){
		var url = document.getElementById("url");
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/upload/url", false);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("url=" + url.value);
		url.value = "";
	}
}

window.addEventListener("dragenter",function(event){
	document.body.classList.add('dragging');
	event.preventDefault();
},false);
window.addEventListener("dragover",function(event){
	event.preventDefault();
},false);
window.addEventListener("dragleave",function(event){
	document.body.classList.remove('dragging');
	event.preventDefault();
},false);
window.addEventListener("drop",function(event){
	event.preventDefault();
	var files = event.dataTransfer.files;
	if(files.length > 0){ //wants to upload file(s) instead of drop another html element.
		var formData = new FormData();
		formData.append("path", this.path);
		for(var i=0,y=files.length;i<y;i++){
			formData.append('drop' + i, files[i]);
		}

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/upload/file');

		xhr.onload = function(){
			if(xhr.status === 204){
				document.body.classList.remove('dragging');
			}
		};

		xhr.send(formData);
	}
},false);

window.addEventListener("DOMContentLoaded", clickDropArea, false);
