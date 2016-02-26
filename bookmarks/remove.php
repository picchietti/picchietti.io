<?php
require("cred.php");
require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$url = $db->real_escape_string($_POST['url']);

$found = $db->query("SELECT icon FROM bookmarks WHERE url='{$url}' LIMIT 1");
$row = $found->fetch_assoc();

if($row["icon"]!="favicon.png" && $row["icon"!="file.png"]){
    unlink("icons/".$row["icon"]);
}

echo $db->query("DELETE FROM bookmarks WHERE url='{$url}' LIMIT 1");

$db->close();

?>