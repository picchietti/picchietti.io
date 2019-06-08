import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GrowthGraph from '../../components/graphs/growth';
import Picture from '../../components/picture';
import GitSocial from '../../components/GitSocial';
import Projects from './components/projects';
import Project from './components/projects/project';
import Skills from './components/skills';
import SkillSet from './components/skills/skillset';
import Skill from './components/skills/skill';
import Timeline from './components/timeline';
import qrcode from './images/qrcode.svg';
import profile from './images/profile2.png';
import './contributions.json';
import './greplytix-recommendation-online.pdf';

import './index.scss';

const employmentHistory = [
  { from: '2018', description: <span><span className="bold">Software Engineer</span>, <a href="https://www.express-scripts.com/" target="_blank" rel="noopener noreferrer">Express Scripts</a></span>, bullets: [<span>Working on a complex, large scale system with a highly qualified team.</span>], isFeatured: true },
  { from: '2015', to: '2018', description: <span><span className="bold">Software Engineer</span>, <a href="http://www.greplytix.com/" target="_blank" rel="noopener noreferrer">Greplytix</a></span>, bullets: [<span><a href="/other/greplytix-recommendation-online.pdf">Letter of recommendation</a>.<span className="on-print-inline"> (online)</span></span>, <span>Component-based, MVC web application development.</span>, <span>Promoted to lead client-side developer.</span>] },
  { from: '2013', to: '2015', description: <span><span className="bold">Webmaster</span>, <a href="http://www.siualumni.com/" target="_blank" rel="noopener noreferrer">Southern Illinois University Alumni Association</a></span>, bullets: [<span>Handled all website tasks.</span>, <span>Assisted clients with technical problems.</span>, <span>Utilized analytical data for informed, money-saving decisions.</span>] },
  { from: '2011', to: '2012', description: <span><span className="bold">Information Technology</span>, <a href="http://infotech.siu.edu/" target="_blank" rel="noopener noreferrer">Southern Illinois University IT</a></span>, bullets: [<span>Inspected thousands of code files for malicious code.</span>, <span>Trained new employees.</span>] },
  { from: '2010', to: '2011', description: <span><span className="bold">Computer Lab Manager</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank" rel="noopener noreferrer">Champaign Central High School</a></span>, bullets: [<span>Administered and networked 25 Apple iMacs.</span>, <span>Taught students web development.</span>] },
  { from: '2009', to: '2011', description: <span><span className="bold">Lead Web Developer</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank" rel="noopener noreferrer">Champaign Central High School</a></span>, bullets: [<span>Only student with expertise and trust to work on <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank" rel="noopener noreferrer">school website</a>.</span>, <span>Edited several hundred webpages.</span>] }
];

const yearsOfExperience = parseInt((new Date()).getFullYear()) - 2007;

export default function Resume(props) {
  return (
    <main>
      <div styleName="resume">
        <div styleName="header">
          <div styleName="profile" className="hidden-small">
            <Picture src={profile} alt="Me" />
          </div>
          <div styleName="name">
            <div className="wrap-centered">
              <div className="full alignr">Jon Picchietti</div>
              <div styleName="pronunciation">(pronounced <span className="italic">Pa-ketty</span>)</div>
            </div>
          </div>
          <img src={qrcode} styleName="qr" className="hidden-small" alt="qrcode to picchietti.io" />
        </div>
        <div>
          <div styleName="section">
            <div styleName="title">Contact</div>
            <div styleName="contact-badge">
              <div styleName="contact-info">
                <div>
                  <a href="tel:+13093709036">
                    <FontAwesomeIcon icon="phone" flip="horizontal" />
                    (309) 370-9036
                  </a>
                </div>
                <div>
                  <a href="mailto:jon@picchietti.email">
                    <FontAwesomeIcon icon="envelope" />
                    jon@picchietti.email
                  </a>
                </div>
                <div>
                  <a href="https://www.google.com/maps/dir//St+Charles,+Missouri/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon="map-marker-alt" />
                    St. Charles, MO
                  </a>
                </div>
                <GitSocial />
                <div>
                  <a href="https://www.linkedin.com/in/picchietti/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={ ['fab', 'linkedin'] } />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div styleName="section">
          <div styleName="title">Education</div>
          <div styleName="education">
            <div>2015</div>
            <div className="alignc">
              <Link to="/pages/resource/diploma.png">B.S. Computer Science</Link>
            </div>
            <div className="alignr">
              Southern Illinois University Carbondale (<a href="http://www.abet.org/about-abet/" target="_blank" rel="noopener noreferrer">ABET</a> accredited)
            </div>
          </div>
        </div>

        <div styleName="section">
          <div styleName="title">Experience</div>
          <div className="indent">
            <Skills>
              <SkillSet title="Featured Skills" featured>
                <Skill>JavaScript</Skill>
                <Skill>React</Skill>
                <Skill>NodeJS</Skill>
                <Skill>MongoDB</Skill>
                <Skill>Jest</Skill>
                <Skill>CSS</Skill>
                <Skill>Sass</Skill>
                <Skill>Ruby/Rails</Skill>
                <Skill>Git</Skill>
                <Skill>Docker</Skill>
                <Skill>Bootstrap</Skill>
              </SkillSet>
              <SkillSet title="Other Skills">
                <Skill>MySQL</Skill>
                <Skill>HTML</Skill>
                <Skill>Java &amp; Android SDK</Skill>
                <Skill>Gulp</Skill>
                <Skill>D3</Skill>
                <Skill>Bash</Skill>
                <Skill>Lets Encrypt</Skill>
                <Skill>MomentJS</Skill>
                <Skill>CoffeeScript</Skill>
              </SkillSet>
              <SkillSet title="Main Operating System">
                <Skill>Ubuntu Linux</Skill>
              </SkillSet>
              <SkillSet title="Deprecated Skills">
                <Skill>Vagrant</Skill>
                <Skill>PHP</Skill>
                <Skill>Backbone</Skill>
                <Skill>Handlebars</Skill>
                <Skill>Haml</Skill>
              </SkillSet>
            </Skills>
          </div>
        </div>

        <div styleName="section">
          <div styleName="title">Employment</div>
          <div className="indent">
            <Timeline points={employmentHistory} />
          </div>
        </div>

        <div styleName="section">
          <div styleName="title">Software &amp; Projects</div>
          <Projects>
            <Project
              title="DIY Wifi Router"
              icon="wifi"
              link="https://gist.github.com/picchietti/337029cf1946ff9e43b0f57aa75f6556"
              description="Making a wireless router with an ASUS PCE-AC88 and Linux" />
            <Project
              title="Hamlbars"
              icon="edit"
              link="https://atom.io/packages/language-hamlbars"
              description="Open-source Atom and Sublime Text 3 editor plugins" />
            <Project
              title="DNA Discovery"
              icon="dna"
              link="https://dnadiscovery.net"
              description="Website for the family of a friend" />
          </Projects>
        </div>

        <div styleName="section">
          <div styleName="title">Impact</div>
          <div className="indent">Over <span className="bold">{yearsOfExperience} years</span> of programming has led me to edit millions of lines of code, positively impacting countless users.</div>
          <div styleName="impacts">
            <div styleName="impact">
              <GrowthGraph
                dataUrl="/other/contributions.json"
                xLabel="Jan 2015 - Dec 2016"
                accumulate={true}
                title="Github Contributions" />
            </div>
            <div styleName="impact">
              <GrowthGraph
                dataUrl="data/month/users"
                xLabel="Last 30 days"
                accumulate={false}
                title="Websites User Audience"
                info="Data from a subset of the websites I've worked on." />
            </div>
            <div styleName="impact">
              <GrowthGraph
                dataUrl="data/month/pageviews"
                xLabel="Last 30 days"
                accumulate={false}
                title="Websites Webpage Views"
                info="Data from a subset of the websites I've worked on." />
            </div>
          </div>
        </div>

        <div styleName="section">
          <div styleName="title">Awards &amp; Certification</div>
          <ul>
            <li>Academic Dean&apos;s List, <a href="/pages/resource/assets/awards/deans-list/2014.pdf">2014</a> - <a href="/pages/resource/assets/awards/deans-list/2015.pdf">2015</a></li>
            <li>Google Analytics Certification &ndash; <Link to="/pages/resource/certifications/analytics/ecommerce.png">Ecommerce Analytics</Link>, <Link to="/pages/resource/certifications/analytics/platform.png">Platform Principles</Link>, <Link to="/pages/resource/certifications/analytics/fundamentals.png">Analytics Fundamentals</Link></li>
            <li><Link to="/pages/resource/awards/wyse.jpg">Computer Science Sectional Champion</Link> &ndash; Worldwide Youth in Science and Engineering, 2011</li>
            <li>Technological Achievement Award &ndash; Microsoft&apos;s University of Illinois Gamebuilder&apos;s Hackathon, 2011</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
