<?php
require("cred.php");
require("/home/sysadminjon/private/picchietti.io/database.php");

$a = $db->real_escape_string($_GET['amount']);
$f = htmlspecialchars_decode($db->real_escape_string($_GET['folder']));

$found = $db->query("SELECT url,title,icon FROM bookmarks WHERE folder='Bookmark Bar' ORDER BY id asc"); //folder,url,title,icon
while($row = $found->fetch_assoc()){
	$all['bar']['url'][]=$row['url'];
	$all['bar']['title'][]=$row['title'];
	$all['bar']['icon'][]=$row['icon'];
}

$found = $db->query("SELECT url,title,icon FROM bookmarks WHERE folder='$f' ORDER BY id asc LIMIT $a"); //folder,url,title,icon
while($row=$found->fetch_assoc()){
	$all['other']['url'][]=$row['url'];
	$all['other']['title'][]=$row['title'];
	$all['other']['icon'][]=$row['icon'];
}

$db->close();

echo json_encode($all);

?>
