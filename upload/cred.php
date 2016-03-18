<?php

if(!isset($_COOKIE["PHPSESSID"]) || !session_start() || $_SESSION["user"]!="jon@picchietti.email")
	header("location:https://www.picchietti.io/login/?r=https://www.picchietti.io/upload/");

?>
