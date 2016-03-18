<?php

// log via email the attempts that stand out?

if(isset($_COOKIE["PHPSESSID"])){ // also exit here if $_SERVER https isn't set
	exit();
}

require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$ip=$_SERVER["REMOTE_ADDR"];
$attempts=$db->query("SELECT number FROM attempts WHERE ip='$ip'")->fetch_assoc();
$attempts=intval($attempts["number"]);

if($attempts >= 1)
	sleep(15);

$email=$db->real_escape_string($_POST['email']);
$pass=$db->real_escape_string($_POST['pass']);

$results=$db->query("SELECT password,salt FROM accounts WHERE email='$email'");
$data=$results->fetch_assoc();
$hash1=hash("sha512",$pass.$data['salt']);

if($hash1==$data['password']){
	session_start();
	$_SESSION['user']=$email;
	$db->query("DELETE FROM attempts WHERE ip='$ip'");
}
else{
	$db->query("INSERT IGNORE INTO attempts (ip,number) VALUES('$ip',0)");
	$db->query("UPDATE attempts SET number=number+1 WHERE ip='$ip'");

	http_response_code(401);
}

$db->close();
?>
