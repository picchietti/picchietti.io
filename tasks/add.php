<?php

require("cred.php");
require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$task = str_replace(">","&gt;",str_replace("<","&lt;",$db->real_escape_string($_POST['task'])));

$insert = $db->query("INSERT INTO tasks (task) VALUES ('$task')");
$id = $db->query("SELECT id FROM tasks WHERE task='$task' LIMIT 1");
echo $id->fetch_assoc()['id'];

$db->close();

?>