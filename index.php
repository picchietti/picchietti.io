<!DOCTYPE HTML>
<html>
	<head>
		<title>Jon Picchietti</title>
		<meta name="description" content="Jon Picchietti, recent SIUC graduate, is an adept computer scientist currently living, learning, and programming in Southern Illinois." />
		@@include('./includes/head.php')
		<link rel="stylesheet" href="/css/resume.css">
		<script src="/lib/d3/d3.min.js"></script>
		<script src="/scripts/growth-overview.js"></script>
		<script>
			window.addEventListener('load', function(){
				growth_overview("#contribution-graph", "data/contributions.json", "Jan 2015-16", true);
				growth_overview("#users-graph", "data/users-month.php", "Last 30 days", false);
				growth_overview("#pageviews-graph", "data/pageviews-month.php", "Last 30 days", false);
			}, false);

			window.addEventListener('DOMContentLoaded', function(){
				$('toggle-experiences').addEventListener('click', function(){
					Loader.load("/scripts/snippets/toggle.js", function(){
						Toggle.display('other-experiences');

						var button = $('toggle-experiences');
						var box = $('other-experiences');
						if(box.style.display != 'none')
							button.innerHTML = '(2) Less';
						else
							button.innerHTML = '(2) More';
					});
				}, false);
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
						<div id="skills">
							<div class="subtitle">Skills</div>
								<span class="skill">JavaScript</span>
								<span class="skill">CoffeeScript</span>
								<span class="skill">PHP</span>
								<span class="skill">MySQL</span>
								<span class="skill">HTML5</span>
								<span class="skill">CSS3</span>
								<span class="skill">Sass</span>
								<span class="skill">Git</span>
								<span class="skill">Java &amp; Android SDK</span>
								<span class="skill">Ruby/Rails</span>
								<span class="skill">Backbone</span>
								<span class="skill">Handlebars</span>
								<span class="skill">Haml</span>
								<span class="skill">Bash</span>
								<!-- <span class="skill">D3</span> -->
						</div>
					</div>

					<div class="section">
						<div class="title">Employment</div>
						<div id="experiences">
							<div class="experience">
								<div class="when fa-stack fa-2x" title="2015 - Current">
									<i class="fa fa-stack-1x fa-circle background"></i>
									<i class="fa fa-stack-1x fa-circle foreground"></i>
									<i class="fa year">2015+</i>
								</div>
								<div class="what">
									<i class="fa fa-caret-left"></i>
									<span class="bold">Software Engineer</span>, <a href="http://www.greplytix.com/" target="_blank">Greplytix</a>
									<ul>
										<li>Component-based, MVC web application development.</li>
										<li>Innovating with cutting-edge technologies.</li>
									</ul>
								</div>
							</div>
							<div class="experience">
								<div class="when fa-stack fa-2x" title="2013 - 2015">
									<i class="fa fa-stack-1x fa-circle background"></i>
									<i class="fa fa-stack-1x fa-circle foreground"></i>
									<i class="fa year">13-15</i>
								</div>
								<div class="what">
									<i class="fa fa-caret-left"></i>
									<span class="bold">Webmaster</span>, <a href="http://www.siualumni.com/" target="_blank">Southern Illinois University Alumni Association</a>
									<ul>
										<li>Handled all website tasks.</li>
										<li>Assisted clients with technical problems.</li>
										<li>Utilized analytical data for informed, money-saving decisions.</li>
									</ul>
								</div>
							</div>
							<div class="experience">
								<div class="when fa-stack fa-2x" title="2011 - 2012">
									<i class="fa fa-stack-1x fa-circle background"></i>
									<i class="fa fa-stack-1x fa-circle foreground"></i>
									<i class="fa year">11-12</i>
								</div>
								<div class="what">
									<i class="fa fa-caret-left"></i>
									<span class="bold">Information Technology</span>, <a href="http://infotech.siu.edu/" target="_blank">Southern Illinois University IT</a>
									<ul>
										<li>Searched thousands of webpages for malicious code.</li>
										<li>Trained new employees.</li>
									</ul>
								</div>
							</div>

							<div id="other-experiences">
								<div class="experience">
									<div class="when fa-stack fa-2x" title="2010 - 2011">
										<i class="fa fa-stack-1x fa-circle background"></i>
										<i class="fa fa-stack-1x fa-circle foreground"></i>
										<i class="fa year">10-11</i>
									</div>
									<div class="what">
										<i class="fa fa-caret-left"></i>
										<span class="bold">Computer Lab Manager</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank">Champaign Central High School</a>
										<ul>
											<li>Administered and networked 25 new apple iMacs.</li>
											<li>Taught students web development.</li>
										</ul>
									</div>
								</div>

								<div class="experience">
									<div class="when fa-stack fa-2x" title="2009 - 2011">
										<i class="fa fa-stack-1x fa-circle background"></i>
										<i class="fa fa-stack-1x fa-circle foreground"></i>
										<i class="fa year">09-11</i>
									</div>
									<div class="what">
										<i class="fa fa-caret-left"></i>
										<span class="bold">Lead Web Developer</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank">Champaign Central High School</a>
										<ul>
											<li>Only student with expertise and trust to work on <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank">school website</a>.</li>
											<li>Edited several hundred webpages.</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div class="alignc">
							<button id="toggle-experiences">(2) More</button>
						</div>
					</div>

					<div class="section">
						<div class="title">Software &amp; Projects</div>
						<ul>
							<li>Hamlbars - Open-source <a href="https://atom.io/packages/language-hamlbars" target="_blank">Atom</a> and <a href="https://packagecontrol.io/packages/Hamlbars" target="_blank">Sublime Text 3</a> editor plugins.</li>
							<li>Websites:
								<ul>
									<li><a href="https://dnadiscovery.net/" target="_blank">DNA Discovery</a></li>
								</ul>
							</li>
							<li>Websites I've worked on but no longer maintain:
								<ul>
									<li><a href="http://www.stlaurs.org/" target="_blank">Stlaurs</a></li>
									<li><a href="http://www2.cs.siu.edu/~HPCLab/" target="_blank">SIU HPC Lab</a></li>
									<li>msknighteducation.com</li>
								</ul>
							</li>
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
							<li>Academic Dean's List, <a href="/award/deans-list/2014.pdf">2014</a> - <a href="/award/deans-list/2015.pdf">2015</a></li>
							<li>Google Analytics Certification &ndash; <a href="/certification/analytics/ecommerce">Ecommerce Analytics</a>, <a href="/certification/analytics/platform">Platform Principles</a>, <a href="/certification/analytics/fundamentals">Analytics Fundamentals</a></li>
							<li><a href="/award/wyse/">Computer Science Sectional Champion</a> &ndash; Worldwide Youth in Science and Engineering, 2011</li>
							<li>Technological Achievement Award &ndash; Microsoft's University of Illinois Gamebuilder's Hackathon, 2011</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		@@include('./includes/footer.php')
		<script src="/scripts/analytics.js"></script>
	</body>
</html>
