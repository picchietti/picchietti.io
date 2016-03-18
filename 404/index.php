<!DOCTYPE html>
<html>
	<head>
		<title>File Not Found</title>
		@@include('../includes/head.php')
		<style>
		#message404{
			text-align:center;
			margin-top:140px;
			line-height: 1.3;
		}

		@media(max-width:960px){
			#message404{margin-top:15px;}
		}
		</style>
	</head>
	<body>
	@@include('../includes/header.php')
		<div id="content">
			<div id="message404">
				<div style="font-size:2em;">Sorry! That page wasn't found.</div>
				<div style="font-size:1.5em;">It may have been (re)moved.</div>
				<div style="font-size:1em;">Please check your spelling.</div>
			</div>
		</div>

	@@include('../includes/footer.php')
	<script src="/scripts/analytics.js"></script>
	</body>
</html>
