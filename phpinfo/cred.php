<?php

if(!isset($_COOKIE["PHPSESSID"]) || !session_start() || $_SESSION["user"]!="jon@picchietti.email")
	header("location:https://www.jonpicchietti.com/login/?r=https://www.jonpicchietti.com/phpinfo/");

?>
