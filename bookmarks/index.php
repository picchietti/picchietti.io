<?php require("cred.php"); ?>
<!DOCTYPE html><html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Jon's Bookmarks</title>
	<meta name=viewport content="width=device-width, initial-scale=1" />
	<link rel="shortcut icon" href="/favicon.png" />
	<link rel="stylesheet" href="/css/bookmarks.css" />
	<link rel="stylesheet" href="/lib/fontello-bookmarks/css/bookmarks.css" />
	<script src="/scripts/bookmarks.js"></script>
</head>
<body>
<div id="bar"></div>

<div id="controls">
	<div id="choose-folder" class="no-select" onclick="togglePopup()"><i class="icon-folder"></i><span id="selected-folder">Select Folder</span></div>
	<input type="text" id="global" placeholder="Enter Website URL..." />
</div>

<div id="bookmarks"></div>

<div id="popup" class="popup" onclick="togglePopup();">
	<div class="modal">
		<div id="folderCol"><i class="icon-folder"></i> Folders</div>
		<input type="button" value="+" id="folder-add" onclick="addFolder();" />
		<div id="folders"></div>
	</div>
</div>

<div id="edit" class="popup">
	<div class="modal">
		<p>Url</p>
		<input type="text" placeholder="Bookmark URL" />
		<p>Title</p>
		<input type="text" placeholder="Bookmark Name" />
		<p style="text-align:center;">
			<input type="button" value="Change" onclick="BookMark.update();" />
			<input type="button" value="Close" onclick="this.parentNode.parentNode.parentNode.style.display='none';" />
		</p>
	</div>
</div>

<div id="menu">
	<div onclick="BookMark.newTab()">Open link in new tab</div>
	<hr class="divider" />
	<div onclick="BookMark.edit()">Edit...</div>
	<hr class="divider" />
	<div onclick="BookMark.remove()" style="font-weight:bold;">Delete</div>
</div>

</body></html>
