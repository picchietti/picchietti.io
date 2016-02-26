<!DOCTYPE HTML>
<html>
	<head>
		<title>Jon Picchietti</title>
		<meta name="description" content="Jon Picchietti, recent SIUC graduate, is an adept computer scientist currently living, learning, and programming in Southern Illinois." />
		@@include('./includes/head.php')
		<link rel="stylesheet" href="//www.jonpicchietti.com/css/resume.css">
		<script src="//www.jonpicchietti.com/lib/d3/d3.min.js"></script>
		<script src="//www.jonpicchietti.com/scripts/growth-overview.js"></script>
		<script>
			window.addEventListener('load', function(){
				growth_overview("#contribution-graph", "data/contributions.json", "Jan 2015-16", true);
				growth_overview("#users-graph", "data/users-month.php", "Last 30 days", false);
				growth_overview("#pageviews-graph", "data/pageviews-month.php", "Last 30 days", false);
			}, false);
		</script>
	</head>
	<body>
		@@include('./includes/header.php')
		<div id="content">
			<div id="paper">
				<div>
					<div id="name2">
						<div id="full">Jon Picchietti</div>
						<div id="pronunciation2">(pronounced <span class="italic">Pa</span>-<span class="italic">ketty</span>)</div>
					</div>
					<div id="right2">
						<div id="qr"></div>
						<div style="float:right;line-height:2.0;margin-top:6px;"><i class="fa fa-phone"></i> <a href="tel:+13093709036">(309) 370-9036</a><br /><i class="fa fa-envelope"></i> <a href="mailto:jon@picchietti.email">jon@picchietti.email</a><br /><i class="fa fa-map-marker"></i> Carbondale, IL</div>
					</div>

					<div style="clear:both;"></div>
				</div>
				<div id="content2">
					<div class="section alignc"><span class="bold">My objective</span> is to solve problems with technology in a collaborative, evolving, and professional manner.</div>

					<div class="section">
						<div class="title">Education</div>
						<div id="education">
							<div>2015</div>
							<div class="alignc">B.S. Computer Science</div>
							<div class="alignr">Southern Illinois University Carbondale</div>
						</div>
					</div>

					<div class="section">
						<div class="title">Experience</div>
						<ul>
							<li><span class="bold">Talents:</span> Website, software, and app programming. Photo editing.</li>
							<li><span class="bold">Languages:</span> JavaScript, PHP, MySQL, HTML5, CSS3, Java &amp; Android SDK, Haml.</li>
							<li><span class="bold">Experience with:</span> Handlebars, Backbone, Bash, Ruby/Rails.</li>
						</ul>
					</div>

					<div class="section">
						<div class="title">Employment</div>
						<div id="experiences" class="indent">
							<div class="experience">
								<span class="bold">Software Engineer</span>, <a href="http://www.greplytix.com/" target="_blank">Greplytix</a>, <span class="gray-date">2015-Current</span>
								<ul>
									<li>Component-based web application development with Backbone, Handlebars, and Haml.</li>
									<li>Innovating with cutting-edge technologies.</li>
								</ul>
							</div>
							<div class="experience">
								<span class="bold">Webmaster</span>, <a href="http://www.siualumni.com/" target="_blank">Southern Illinois University Alumni Association</a>, <span class="gray-date">2013-15</span>
								<ul>
									<li>Handled all website tasks.</li>
									<li>Assisted clients with technical problems.</li>
									<li>Utilized analytical data for informed, money-saving decisions.</li>
								</ul>
							</div>
							<div class="experience">
								<span class="bold">Information Technology</span>, <a href="http://infotech.siu.edu/" target="_blank">Southern Illinois University IT</a>, <span class="gray-date">2011-12</span>
								<ul>
									<li>Searched thousands of webpages for malicious code.</li>
									<li>Trained new employees.</li>
								</ul>
							</div>

							<div id="other-experiences">
								<div class="experience">
									<span class="bold">Webmaster</span>, <a href="https://www.dnadiscovery.net/" target="_blank">DNA Discovery</a>, <span class="gray-date">2014-Ongoing</span>
									<ul>
										<li>Rebuilt website to be competitive and informative.</li>
										<li>Mobile friendly.</li>
									</ul>
								</div>
								<div class="experience">
									<span class="bold">Lead Web Developer</span>, Champaign Central High School, <span class="gray-date">2009-11</span>
									<ul>
										<li>Built <a href="http://internal.champaignschools.org/staffwebsites/plattnda/" target="_blank">webpage</a> for Physics professor to display PowerPoint lectures online.</li>
										<li>Only student with expertise and trust to work on <a href="http://www.champaignschools.org/schools/home/?id=32" target="_blank">school website</a>.</li>
										<li>Edited several hundred webpages.</li>
									</ul>
								</div>
								<div class="experience">
									<span class="bold">Computer Lab Manager</span>, Champaign Central High School, <span class="gray-date">2010-11</span>
									<ul>
										<li>Administered and networked 25 new apple iMacs.</li>
										<li>Taught students web development.</li>
									</ul>
								</div>
								<div class="experience">
									<span class="bold">More websites I've worked on but no longer maintain: </span><a href="http://www.stlaurs.com/" target="_blank">stlaurs.com</a>, <a href="http://www2.cs.siu.edu/~HPCLab/" target="_blank">cs.siu.edu/~HPCLab</a>, msknighteducation.com
								</div>
							</div>

							<div id="toggle-experiences" class="no-select">
								<span class="link" onclick="Loader.load('/scripts/snippets/toggle.js', 'Toggle.display(\'other-experiences\')')">(3) More</span>
							</div>

						</div>
					</div>

					<div class="section">
						<div class="title">Software &amp; Apps</div>
						<ul>
							<li>Hamlbars - Open-source <a href="https://atom.io/packages/language-hamlbars" target="_blank">Atom</a> and <a href="https://packagecontrol.io/packages/Hamlbars" target="_blank">Sublime Text 3</a> editor plugins.</li>
						</ul>
					</div>

					<div class="section">
						<div class="title">Impact</div>
						<!-- <div class="indent">Over <span class="bold"><script>document.write(parseInt((new Date()).getFullYear()) - 2007)</script> years</span> I've edited millions of lines of code, positively impacting countless users.</div> -->
						<div id="impacts">
							<div class="impact growth-overview">
								<div class="growth-overview-title">Github Contributions <i class="fa fa-info-circle" title="Includes contributions to private repositories that do not appear on personal profile."></i></div>
								<div id="contribution-graph"></div>
							</div>
							<div class="impact growth-overview">
								<div class="growth-overview-title">Websites User Audience <i class="fa fa-info-circle" title="Data from a subset of the websites I've worked on."></i></div>
								<div id="users-graph"></div>
							</div>
							<div class="impact growth-overview">
								<div class="growth-overview-title">Websites Webpage Views <i class="fa fa-info-circle" title="Data from a subset of the websites I've worked on."></i></div>
								<div id="pageviews-graph"></div>
							</div>
						</div>
					</div>

					<div class="section">
						<div class="title">Awards &amp; Certification</div>
						<ul>
							<li>Academic Dean's List, <a href="//www.jonpicchietti.com/award/deans-list/2014.pdf">2014</a> - <a href="//www.jonpicchietti.com/award/deans-list/2015.pdf">2015</a></li>
							<li>Google Analytics Certification &ndash; <a href="//www.jonpicchietti.com/certification/analytics/ecommerce">Ecommerce Analytics</a>, <a href="//www.jonpicchietti.com/certification/analytics/platform">Platform Principles</a>, <a href="//www.jonpicchietti.com/certification/analytics/fundamentals">Analytics Fundamentals</a></li>
							<li><a href="//www.jonpicchietti.com/award/wyse/">Computer Science Sectional Champion</a> &ndash; Worldwide Youth in Science and Engineering, 2011</li>
							<li>Technological Achievement Award &ndash; Microsoft's University of Illinois Gamebuilder's Hackathon, 2011</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		@@include('./includes/footer.php')
		<script src="//www.jonpicchietti.com/scripts/analytics.js"></script>
	</body>
</html>
