var Account = {

	setupPage:function(){
		var email1, pass1;

		email1 = $("email1");
		pass1 = $("pass1");

		email1.addEventListener("keyup", Account.ready, false);
		pass1.addEventListener("keyup", Account.ready, false);
		pass1.addEventListener("input", Password.safety, false);

		$("email1").focus();
	},

	ready:function(e){
		e = e || window.event;
		if(e.keyCode == 13){
			var userBox = $("email1").value != "";
			var passBox = $("pass1").value != "";
			if(userBox && passBox) Account.login();
		}
	},

	login:function(){
		var email = $("email1").value;
		var pass = $("pass1").value;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://www.jonpicchietti.com/scripts/login.php", true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send('email='+email+'&pass='+pass);
		xhr.onreadystatechange=function(){
			if(xhr.readyState == 4){
				if(xhr.status == 401){
					$("feedback").innerHTML = "Incorrect username or password.";
					$("pass1").value = "";
					$("pass1").focus();
				}
				else if(xhr.status == 200){
					var match = location.search.match(/(?:\?|&)r=([^&]*)/);
					if(match != null && match[1] != "")
						location.href = match[1];
					else
						location.href = "//www.jonpicchietti.com";
				}
			}
		}
	}

};

var Password={
	safety:function(){
		var password = $("pass1").value;
		var hasymbols = /[^a-zA-Z]+/;
		if(password.length == 0){
			Password.reset();
			return;
		}
		else if(password.length < 8){
			Password.isBad();
			return;
		}

		if(password.length >= 12 || hasymbols.test(password)){
			Password.isGood();

			if(password.length >= 16 && hasymbols.test(password))
				Password.isAwesome();
		}

	},

	reset:function(){
		$("strength").style.width = "0px";
	},

	isBad:function(){
		var indicator = $("strength");
		indicator.style.width = "33.3%";
		indicator.style.backgroundColor = "#f00";
	},

	isGood:function(){
		var indicator = $("strength");
		indicator.style.width = "66.6%";
		indicator.style.backgroundColor = "rgb(255,207,12)";
	},

	isAwesome:function(){
		var indicator = $("strength");
		indicator.style.width = "100%";
		indicator.style.backgroundColor = "#6f0";
	}
};
