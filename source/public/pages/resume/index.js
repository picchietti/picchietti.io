import React from 'react';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';

import GrowthGraph from '../../components/graphs/growth';
import Timeline from './components/timeline';

import './index.scss';

export default class Resume extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSkills: false
    }

    this.employmentHistory = [
      {from: '2015', to: '2018', description: <span><span className="bold">Software Engineer</span>, <a href="http://www.greplytix.com/" target="_blank">Greplytix</a></span>, bullets: [<span><a href="/pages/resume/greplytix-recommendation-online.pdf">Letter of recommendation</a>.<span className="on-print-inline"> (online)</span></span>, <span>Component-based, MVC web application development.</span>, <span>Promoted to lead client-side developer.</span>], isFeatured: true},
      {from: '2013', to: '2015', description: <span><span className="bold">Webmaster</span>, <a href="http://www.siualumni.com/" target="_blank">Southern Illinois University Alumni Association</a></span>, bullets: [<span>Handled all website tasks.</span>, <span>Assisted clients with technical problems.</span>, <span>Utilized analytical data for informed, money-saving decisions.</span>], isFeatured: false},
      {from: '2011', to: '2012', description: <span><span className="bold">Information Technology</span>, <a href="http://infotech.siu.edu/" target="_blank">Southern Illinois University IT</a></span>, bullets: [<span>Inspected thousands of code files for malicious code.</span>, <span>Trained new employees.</span>], isFeatured: false},
      {from: '2010', to: '2011', description: <span><span className="bold">Computer Lab Manager</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank">Champaign Central High School</a></span>, bullets: [<span>Administered and networked 25 Apple iMacs.</span>, <span>Taught students web development.</span>], isFeatured: false},
      {from: '2009', to: '2011', description: <span><span className="bold">Lead Web Developer</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank">Champaign Central High School</a></span>, bullets: [<span>Only student with expertise and trust to work on <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank">school website</a>.</span>, <span>Edited several hundred webpages.</span>], isFeatured: false}
    ];

    this.years_of_experience = parseInt((new Date()).getFullYear()) - 2007;

    _.bindAll(this, ['onSkillsToggle']);
  }

  onSkillsToggle() {
    this.setState(prevState => {
      return {showSkills: !prevState.showSkills};
    });
  }

  render() {
    return (
      <div className="content">
        <div className="resume">
          <div>
            <div className="name">
              <div className="full">Jon Picchietti</div>
              <div className="pronunciation">(pronounced <span className="italic">Pa-ketty</span>)</div>
            </div>
            <div className="contact-badge">
              <img src="/images/qrcode.svg" className="qr" alt="qrcode to picchietti.io" />
              <div className="contact-info">
                <i className="fa fa-phone"></i> <a href="tel:+13093709036">(309) 370-9036</a>
                <br />
                <i className="fa fa-envelope"></i> <a href="mailto:jon@picchietti.email">jon@picchietti.email</a>
                <br />
                <i className="fa fa-map-marker"></i> St. Charles, MO
              </div>
            </div>

            <div className="clearb"></div>
          </div>
          <div>
            <div className="section alignc"><span className="bold">My objective</span> is to solve problems with technology in a collaborative, evolving, and professional manner.</div>

            <div className="section">
              <div className="title">Education</div>
              <div className="education">
                <div>2015</div>
                <div className="alignc">
                  <Link to="/pages/resource/diploma.png">B.S. Computer Science</Link>
                </div>
                <div className="alignr">
                  Southern Illinois University Carbondale (<a href="http://www.abet.org/about-abet/" target="_blank">ABET</a> accredited)
                </div>
              </div>
            </div>

            <div className="section">
              <div className="title">Experience</div>
              <div className="skills">
                <div className="subtitle"><i className="fa fa-star featured"></i> Featured Skills</div>
                  <span className="skill">JavaScript</span>
                  <span className="skill">NodeJS</span>
                  <span className="skill">HTML</span>
                  <span className="skill">CSS</span>
                  <span className="skill">MySQL</span>
                  <span className="skill">Sass</span>
                  <span className="skill">Java &amp; Android SDK</span>
                  <span className="skill">Ruby/Rails</span>
                  <span className="skill">Git</span>
                  <span className="skill">Docker</span>
                  <span className="skill">Bootstrap</span>
                {this.state.showSkills &&
                  <div className="other-skills">
                    <div className="subtitle">Other Skills</div>
                    <span className="skill">CoffeeScript</span>
                    <span className="skill">Backbone</span>
                    <span className="skill">Handlebars</span>
                    <span className="skill">Haml</span>
                    <span className="skill">Gulp</span>
                    <span className="skill">D3</span>
                    <span className="skill">Bash</span>
                    <span className="skill">Lets Encrypt</span>
                    <span className="skill">MomentJS</span>
                    <div className="subtitle">Deprecated Skills</div>
                    <span className="skill">Vagrant</span>
                    <span className="skill">PHP</span>
                    <div className="subtitle">Main Operating System</div>
                    <span className="skill">Ubuntu Linux</span>
                    <div className="subtitle">Tools</div>
                    <span className="skill">Atom</span>
                    <span className="skill">Gitkraken</span>
                    <span className="skill">Android Studio</span>
                    <span className="skill">Slack</span>
                  </div>
                }
              </div>
              <div className="indent">
                <button onClick={this.onSkillsToggle}>(4) {this.state.showSkills ? 'Less' : 'More'}</button>
              </div>
            </div>

            <div className="section">
              <div className="title">Employment</div>
              <Timeline points={this.employmentHistory} />
            </div>

            <div className="section">
              <div className="title">Software &amp; Projects</div>
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

              <div className="indent spacing-top">
                <a href="https://github.com/picchietti" target="_blank">
                  <button><i className="fa fa-github"></i> More on Github</button>
                </a>
              </div>
            </div>

            <div className="section">
              <div className="title">Impact</div>
              <div className="indent">Over <span className="bold">{this.years_of_experience} years</span> of programming has led me to edit millions of lines of code, positively impacting countless users.</div>
              <div className="impacts">
                <div className="impact growth-overview">
                  <div className="growth-overview-title">Github Contributions</div>
                  <GrowthGraph dataUrl="/pages/resume/contributions.json" xLabel="Jan 2015 - Dec 2016" accumulate={true} />
                </div>
                <div className="impact growth-overview">
                  <div className="growth-overview-title">Websites User Audience <i className="fa fa-info-circle" title="Data from a subset of the websites I've worked on."></i></div>
                  <GrowthGraph dataUrl="data/month/users" xLabel="Last 30 days" accumulate={false} />
                </div>
                <div className="impact growth-overview">
                  <div className="growth-overview-title">Websites Webpage Views <i className="fa fa-info-circle" title="Data from a subset of the websites I've worked on."></i></div>
                  <GrowthGraph dataUrl="data/month/pageviews" xLabel="Last 30 days" accumulate={false} />
                </div>
              </div>
            </div>

            <div className="section">
              <div className="title">Awards &amp; Certification</div>
              <ul>
                <li>Academic Dean's List, <a href="/pages/awards/deans-list/2014.pdf">2014</a> - <a href="/pages/awards/deans-list/2015.pdf">2015</a></li>
                <li>Google Analytics Certification &ndash; <Link to="/pages/resource/certifications/analytics/ecommerce/certificate.png">Ecommerce Analytics</Link>, <Link to="/pages/resource/certifications/analytics/platform/certificate.png">Platform Principles</Link>, <Link to="/pages/resource/certifications/analytics/fundamentals/certificate.png">Analytics Fundamentals</Link></li>
                <li><Link to="/pages/resource/awards/wyse/medal.jpg">Computer Science Sectional Champion</Link> &ndash; Worldwide Youth in Science and Engineering, 2011</li>
                <li>Technological Achievement Award &ndash; Microsoft's University of Illinois Gamebuilder's Hackathon, 2011</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
