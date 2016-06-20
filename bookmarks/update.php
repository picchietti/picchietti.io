<?php

require("cred.php");
require("/home/sysadminjon/private/picchietti.io/database.php");

$oldurl = $db->real_escape_string($_POST['oldurl']);
$oldurl = urldecode($oldurl);
$url = $db->real_escape_string($_POST['url']);
$url = urldecode($url);
$name = trim($db->real_escape_string($_POST['name']));
$name = urldecode($name);

if(isset($_POST['name'])){
	$db->query("UPDATE bookmarks SET title='{$name}' WHERE url='{$oldurl}' LIMIT 1") or die($db->error());
}

if(isset($_POST['url'])){
	$hash = md5($url);
	$db->query("UPDATE bookmarks SET url='{$url}', url_hash='{$hash}' WHERE url='{$oldurl}' LIMIT 1") or die($db->error());
}

$db->close();

?>
