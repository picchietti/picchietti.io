<?php
require("cred.php");
$url = $_POST["url"];
$name = basename($url);
$image = file_get_contents($url);
if($image!==false)
	file_put_contents("files/$name", $image);
?>