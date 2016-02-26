<?php

require("cred.php");
require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$found = $db->query("SELECT id,task FROM tasks ORDER BY id asc"); //task

while($row=$found->fetch_assoc()){
	$all["id"][]=$row['id'];
	$all["task"][]=$row['task'];
}

$db->close();

echo json_encode($all);

?>