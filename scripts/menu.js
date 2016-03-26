function resetMenu(){
	if(window.innerWidth>=960){
		Menu.off();
	}
}

var Menu={
	on:function(){
		$('menu2').style.left="0px";
		window.addEventListener("resize", resetMenu, false);
	},
	off:function(){
		$('menu2').style.left="-100%";
		window.removeEventListener("resize", resetMenu, false);
	}
}

window.addEventListener('DOMContentLoaded',function(){
	$("menu-toggle").addEventListener('click', Menu.on, false);
	$("menu2").addEventListener('click', Menu.off, false);
},false);
