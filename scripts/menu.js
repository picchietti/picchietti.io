function resetMenu(){
	if(window.innerWidth>=960){
		Menu.off();
	}
}

var Menu={
	on:function(){
		$("menu").style.display="block";
		window.addEventListener("resize", resetMenu, false);
	},
	off:function(){
		$("menu").style.display="none";
		window.removeEventListener("resize", resetMenu, false);
	}
}

window.addEventListener('DOMContentLoaded',function(){
	$("menu-toggle").addEventListener('click', Menu.on, false);
	$("menu").addEventListener('click', Menu.off, false);
},false);
