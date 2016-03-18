<?php require("cred.php"); ?>
<!DOCTYPE html><html lang="en">
<head>
<title>Upload Files</title>
@@include('../includes/head.php')
<script>
var num = 0;
function another(){
	var input = document.createElement("input");
	input.type = "file";
	input.name = "file" + (++num);
	input.addEventListener("change",function(){
		var formData = new FormData();

		formData.append(this.name, this.files[0]);

		var xhr = new XMLHttpRequest();
		xhr.open("POST","/upload/upload.php",true);
		xhr.onload = function(){
			$("uploads").removeChild(input);
		}

		xhr.send(formData);
		another();

	}, false)
	$("uploads").appendChild(input);
}

function checkEnter(event){
	if(event.keyCode == 13){
		var url = document.getElementById("url");
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/upload/url.php", false);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("url=" + url.value);
		url.value = "";
	}
}

window.addEventListener("dragenter",function(event){event.preventDefault();},false);
window.addEventListener("dragover",function(event){event.preventDefault();},false);
window.addEventListener("drop",function(event){
	event.preventDefault();
	var files = event.dataTransfer.files;
	if(files.length > 0){ //wants to upload file(s) instead of drop another html element.
		var formData = new FormData();
		formData.append("path",this.path);
		for(var i=0,y=files.length;i<y;i++){
			formData.append('drop' + i, files[i]);
		}

		var xhr=new XMLHttpRequest();
		xhr.open('POST', '/upload/upload.php');

		xhr.onload=function(){if(xhr.status===200){
			alert("Uploaded file!");
		}};

		xhr.send(formData);
	}
},false);

window.addEventListener("load", another, false)
</script>
<style>
#url{text-align:center;width:85%;font-size:16pt;padding:3px;}
</style>
</head>
<body>
@@include('../includes/header.php')
<div id="content">
	<div class="alignc" style="margin:20px 0;">
		<input type="text" id="url" placeholder="Upload from URL..." onkeypress="checkEnter(event);" />
	</div>

	<div id="uploads"></div>
</div>

@@include('../includes/footer.php')
</body></html>
