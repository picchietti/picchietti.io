<?php

require("cred.php");
require("/home/sysadminjon/private/jonpicchietti.com/database.php");

$task = str_replace(">","&gt;",str_replace("<","&lt;",$db->real_escape_string($_POST['task'])));

$insert = $db->query("DELETE FROM tasks WHERE task='$task' LIMIT 1");

$db->close();

?>
