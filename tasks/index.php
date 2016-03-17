<?php require("cred.php"); ?>
<!DOCTYPE html>
<html>
<head>
<title>Jon's To-Do</title>
@@include('../includes/head.php')
<style>
#global{font-size:16pt;width:90%;margin-bottom: 15px;}
.overlay{position:absolute;width:100%;height:100%;left:0px;top:0px;border: 0;outline:1px dashed #ccc;font-family:inherit;font-size:inherit;resize:none;padding:inherit;line-height:inherit;}
#tasks{width:100%;cursor: default;font-size: 1em;line-height:1em;}
#tasks .check, #tasks .about{padding: 10px 0;}
#tasks .item{position: relative;overflow: hidden;}
#tasks .check{display: block;background-color: #ddd;padding-left: 10px;}
#tasks .deleting{color: #0f0;}
#tasks .about{background-color: #fff;position:absolute;top:0;left:0;width:100%;padding-left:5px;}
</style>
<script src="//www.jonpicchietti.com/lib/underscore.min.js"></script>
<script src="//www.jonpicchietti.com/scripts/task.js"></script>
</head>
<body>
@@include('../includes/header.php')
<div id="content">
	<div class="alignc">
		<input type="text" id="global" placeholder="To do..." />
	</div>

	<div id="tasks"></div>
</div>

@@include('../includes/footer.php')
</body></html>
