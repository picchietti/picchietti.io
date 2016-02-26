<?php

require("cred.php");

//make sure folder isn't already made!

if($_POST["f"] == "")
	http_response_code(400);

$name=htmlspecialchars($_POST["f"]);
$content=file_get_contents("include_folders.txt");
$new=substr_replace($content, ',"'.$name.'"', strlen($content)-1, 0); //insert new folder name into array string.
file_put_contents("include_folders.txt",$new);

?>
