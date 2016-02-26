<?php

require("cred.php");
require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$id = $db->real_escape_string($_POST['id']);
$task = str_replace(">","&gt;",str_replace("<","&lt;",$db->real_escape_string($_POST['replaced'])));

$db->query("UPDATE tasks SET task='$task' WHERE id='$id' LIMIT 1");

$db->close();

?>
