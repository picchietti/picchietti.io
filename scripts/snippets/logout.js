function logout(){
	var xhr=new XMLHttpRequest();
	xhr.open("POST","//www.jonpicchietti.com/scripts/logout.php",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send();
	xhr.onreadystatechange=function(){if(xhr.readyState==4 && xhr.status==200){
		location.reload();
	}}
}
