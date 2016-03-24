<?php

if(!isset($_COOKIE["PHPSESSID"]) || !session_start() || $_SESSION["user"]!="jon@picchietti.email")
	header("location:https://picchietti.io/login/?r=https://picchietti.io/upload/");

?>
