import React from 'react';

export default class Resume extends React.Component {
  render() {
    return (
      <div id="content">
        <div id="paper">
          <div>
            <div id="name2">
              <div id="full">Jon Picchietti</div>
              <div id="pronunciation2">(pronounced <span class="italic">Pa</span>-<span class="italic">ketty</span>)</div>
            </div>
            <div id="right2">
              <img src="/images/qrcode.svg" id="qr" alt="qrcode to picchietti.io" />
              <div class="qr-contact"><i class="fa fa-phone"></i> <a href="tel:+13093709036">(309) 370-9036</a><br /><i class="fa fa-envelope"></i> <a href="mailto:jon@picchietti.email">jon@picchietti.email</a><br /><i class="fa fa-map-marker"></i> Carbondale, IL</div>
            </div>

            <div class="clearb"></div>
          </div>
          <div id="content2">
            <div class="section alignc"><span class="bold">My objective</span> is to solve problems with technology in a collaborative, evolving, and professional manner.</div>

            <div class="section">
              <div class="title">Education</div>
              <div id="education">
                <div>2015</div>
                <div class="alignc">
                  <a class="popup" href="/pages/resume/diploma.png">B.S. Computer Science</a>
                </div>
                <div class="alignr">Southern Illinois University Carbondale (<a href="http://www.abet.org/about-abet/" target="_blank">ABET</a> accredited)</div>
              </div>
            </div>

            <div class="section">
              <div class="title">Experience</div>
              <div id="skills">
                <div class="subtitle"><i class="fa fa-star featured"></i> Featured Skills</div>
                  <span class="skill">JavaScript</span>
                  <span class="skill">NodeJS</span>
                  <span class="skill">HTML</span>
                  <span class="skill">CSS</span>
                  <span class="skill">MySQL</span>
                  <span class="skill">Sass</span>
                  <span class="skill">Java &amp; Android SDK</span>
                  <span class="skill">Ruby/Rails</span>
                  <span class="skill">Git</span>
                  <span class="skill">Docker</span>
                  <span class="skill">Bootstrap</span>
                <div id="other-skills">
                  <div class="subtitle">Other Skills</div>
                    <span class="skill">CoffeeScript</span>
                    <span class="skill">Backbone</span>
                    <span class="skill">Handlebars</span>
                    <span class="skill">Haml</span>
                    <span class="skill">Gulp</span>
                    <span class="skill">D3</span>
                    <span class="skill">Bash</span>
                    <span class="skill">Lets Encrypt</span>
                    <span class="skill">MomentJS</span>
                  <div class="subtitle">Deprecated Skills</div>
                    <span class="skill">Vagrant</span>
                    <span class="skill">PHP</span>
                  <div class="subtitle">Main Operating System</div>
                    <span class="skill">Ubuntu Linux</span>
                  <div class="subtitle">Tools</div>
                    <span class="skill">Atom</span>
                    <span class="skill">Gitkraken</span>
                    <span class="skill">Android Studio</span>
                </div>
              </div>
              <div class="indent">
                <button id="toggle-skills">(4) More</button>
              </div>
            </div>

            <div class="section">
              <div class="title">Employment</div>
              <div id="experiences">
                <div class="experience">
                  <div class="when fa-stack fa-2x" title="2015 - Current">
                    <i class="fa fa-stack-1x fa-circle background"></i>
                    <i class="fa fa-stack-1x fa-star foreground featured"></i>
                    <i class="fa year">2015+</i>
                  </div>
                  <div class="what">
                    <i class="fa fa-caret-left"></i>
                    <span class="bold">Software Engineer</span>, <a href="http://www.greplytix.com/" target="_blank">Greplytix</a>
                    <ul>
                      <li><a href="/pages/resume/greplytix-recommendation-online.pdf">Letter of recommendation</a>.<span class="on-print-inline"> (online)</span></li>
                      <li>Component-based, MVC web application development.</li>
                      <li>Promoted to lead client-side developer.</li>
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
                      <li>Inspected thousands of code files for malicious code.</li>
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
                        <li>Administered and networked 25 Apple iMacs.</li>
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
                <li>Extra websites I've worked on but no longer maintain:
                  <ul>
                    <li><a href="http://www.stlaurs.org/" target="_blank">Stlaurs</a></li>
                    <li><a href="http://www2.cs.siu.edu/~HPCLab/" target="_blank">SIU HPC Lab</a></li>
                  </ul>
                </li>
              </ul>

              <div class="indent spacing-top">
                <a href="https://github.com/picchietti" target="_blank">
                  <button><i class="fa fa-github"></i> More on Github</button>
                </a>
              </div>
            </div>

            <div class="section">
              <div class="title">Impact</div>
              <div class="indent">Over <span class="bold"><script>document.write(parseInt((new Date()).getFullYear()) - 2007)</script>&nbsp;years</span> of programming has led me to edit millions of lines of code, positively impacting countless users.</div>
              <div id="impacts">
                <div class="impact growth-overview">
                  <div class="growth-overview-title">Github Contributions</div>
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
              <div class="title">Accommodations</div>
              <div id="office">
                <div class="description">
                  <div class="bold">Has 24/7 access to a professional, private office.</div>
                  At a startup incubator in <a href="http://researchpark.siu.edu/" target="_blank">SIU's Research Park</a>.
                </div>

                <a class="popup" href="/pages/resume/office.jpg">
                  <img class="thumbnail" src="/pages/resume/office_small.png" alt="Professional workspace" />
                </a>
              </div>
            </div>

            <div class="section">
              <div class="title">Awards &amp; Certification</div>
              <ul>
                <li>Academic Dean's List, <a href="/pages/awards/deans-list/2014.pdf">2014</a> - <a href="/pages/awards/deans-list/2015.pdf">2015</a></li>
                <li>Google Analytics Certification &ndash; <a class="popup" href="/images/certifications/analytics/ecommerce/certificate.png">Ecommerce Analytics</a>, <a class="popup" href="/images/certifications/analytics/platform/certificate.png">Platform Principles</a>, <a class="popup" href="/images/certifications/analytics/fundamentals/certificate.png">Analytics Fundamentals</a></li>
                <li><a class="popup" href="/images/awards/wyse/medal.jpg">Computer Science Sectional Champion</a> &ndash; Worldwide Youth in Science and Engineering, 2011</li>
                <li>Technological Achievement Award &ndash; Microsoft's University of Illinois Gamebuilder's Hackathon, 2011</li>
              </ul>
            </div>
          </div>
        </div>
        <div id="stage">
          <div class="back alignc">
            <i class="fa fa-arrow-left"></i>
            Back
          </div>
          <div class="item"></div>
        </div>
      </div>
    );
  }
}