<?php

if(isset($_COOKIE["PHPSESSID"])){
	header("Location: https://www.jonpicchietti.com");
	exit();
}

?>
<!DOCTYPE html><html lang="en">
<head>
<title>Account Tools</title>
@@include('../includes/head.php')
<script src="//www.jonpicchietti.com/scripts/account.js"></script>
<script>window.addEventListener("load", Account.setupPage, false);</script>
<style>
#access, #signin{float:left;width:48%;}
#signin input{margin:2px 0;}
#security{margin:4px auto;height:5px;background-color:#ddd;}
#strength{height:100%;}
#feedback{text-align:center;color:#f00;}

@media(max-width:625px){
#access, #signin{float:none;width:70%;margin:0 auto;}
#access{margin-top:25px;}
}
</style>
</head>
<body>
@@include('../includes/header.php')
<div id="content">
	<div id="feedback"></div>

	<div id="signin">
		<div class="wrap-centered">
			Login<br />
			<input type="email" id="email1" placeholder="Username (email)" /><br />
			<input type="password" id="pass1" placeholder="Password" /><br />
			<div id="security"><div id="strength"></div></div>
		</div>
	</div>

	<div id="access">
	Oh noes! You've reached a restricted, super secret area of this website that is protected by magic, robots, and other awesome stuff ... or just a login system. Whatever. The point is: if you think you should have access, please contact <a href="mailto:jon@picchietti.email">Jon</a>.
	</div>
</div>
@@include('../includes/footer.php')
<script src="//www.jonpicchietti.com/scripts/analytics.js"></script>
</body></html>
