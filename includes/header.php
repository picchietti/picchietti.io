		<div id="header" class="alignc">
			<div id="left">
				<a href="//picchietti.io">
					<img src="/img/circular.png" alt="" id="profile" />
				</a>
			</div>
			<div id="right">
				<div class="wrap-centered">
					<span id="menu-toggle" class="fa-stack fa-2x no-select">
						<i class="fa fa-circle fa-stack-2x"></i>
						<i class="fa fa-bars fa-stack-1x"></i>
					</span>
				</div>
			</div>
			<div class="wrap-centered">
				<div id="menu2" class="alignl">
					<div id="links">
						<div id="links-centered">
							<?php if($_SERVER['REQUEST_URI'] != '/'){echo '<div><a href="//picchietti.io"><i class="fa fa-fw fa-home"></i> Home</a></div>';} ?>
							<div><a href="https://github.com/picchietti" target="_blank"><i class="fa fa-fw fa-github"></i> Github</a></div>
							
							<div><a href="tel:+13093709036"><i class="fa fa-fw fa-phone"></i> 309-370-9036</a></div>
							<div><a href="https://www.google.com/?gws_rd=ssl#q=Carbondale%2C+IL" target="_blank"><i class="fa fa-fw fa-map-marker"></i> Carbondale, IL</a></div>
							<div><a href="mailto:jon@picchietti.email"><i class="fa fa-fw fa-envelope"></i> jon@picchietti.email</a></div>
							<?php if(isset($_COOKIE['PHPSESSID'])){echo '<div class="link" onclick="Loader.load(\'/scripts/snippets/logout.js\', function(){logout()})"><i class="fa fa-fw fa-sign-out"></i> Sign out</div>';} ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="main">
