<?php
require("cred.php");
require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$from = $db->real_escape_string($_POST['from']);
$to = $db->real_escape_string($_POST['to']);

$found = $db->query("SELECT id FROM bookmarks WHERE url='$from' LIMIT 1")->fetch_assoc();
$found2 = $db->query("SELECT id FROM bookmarks WHERE url='$to' LIMIT 1")->fetch_assoc();

$fromid = intval($found['id']);
$toid = intval($found2['id']);

if($fromid < $toid)
	$db->query("UPDATE bookmarks SET id=id-1 WHERE folder='Bookmark Bar' AND id>$fromid AND id<=$toid");
else
	$db->query("UPDATE bookmarks SET id=id+1 WHERE folder='Bookmark Bar' AND id<$fromid AND id>=$toid");

$db->query("UPDATE bookmarks SET id=$toid WHERE url='$from' LIMIT 1");

$db->close();

?>