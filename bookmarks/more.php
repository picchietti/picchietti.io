<?php
require("cred.php");
require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$a = $db->real_escape_string($_GET['amount']);
$f = htmlspecialchars_decode($db->real_escape_string($_GET['folder']));
$total = $db->real_escape_string($_GET['total']);

$found = $db->query("SELECT url,title,icon FROM bookmarks WHERE folder='$f' ORDER BY id asc LIMIT $total,$a"); //folder,url,title,icon
while($row=$found->fetch_assoc()){
	$all['other']['url'][]=$row['url'];
	$all['other']['title'][]=$row['title'];
	$all['other']['icon'][]=$row['icon'];
}

$db->close();

echo json_encode($all);

?>
