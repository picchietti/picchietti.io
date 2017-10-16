var Account = {

	setupPage:function(){
		var email1, pass1;

		email1 = $("email1");
		pass1 = $("pass1");

		email1.addEventListener("keyup", Account.ready, false);
		pass1.addEventListener("keyup", Account.ready, false);
		pass1.addEventListener("input", Password.strength, false);

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
		xhr.open("POST", "/login", true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send('username='+email + '&password='+pass);
		xhr.onreadystatechange=function(){
			if(xhr.readyState == 4){
				if(xhr.status == 401){
					$("feedback").innerHTML = "Incorrect username or password.";
					$("pass1").value = "";
					$("pass1").focus();
				}
				else if(xhr.status == 200){
					location.href = xhr.responseText;
				}
			}
		}
	}

};

var Password = {
	strength: function(){
		var password = $("pass1").value;
		var has_symbols = /[^a-zA-Z]+/;
		const symbols_points = 2;
		const recommended_length = 16;
		const max_points = recommended_length + symbols_points;
		var points = 0;

		points += Math.min(password.length, recommended_length);

		if(has_symbols.test(password))
			points += symbols_points;

		var indicator = $("strength");
		var points_percentage = points / max_points * 100;
		indicator.style.width = points_percentage + '%';

		if(points_percentage < 40) // bad
			indicator.style.backgroundColor = "#f00";
		else if(points_percentage < 70) // good
			indicator.style.backgroundColor = "rgb(255, 207, 12)";
		else // awesome
			indicator.style.backgroundColor = "#6f0";
	}
};
