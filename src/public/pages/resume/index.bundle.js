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
import { employmentHistory, yearsOfExperience } from './employment';
import qrcode from './images/qrcode.svg';
import profile from './images/profile2.png';
import './greplytix-recommendation-online.pdf';
import './index.css';

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
              </SkillSet>
              <SkillSet title="Automated Testing">
                <Skill>Drone CI</Skill>
                <Skill>Jenkins CI</Skill>
                <Skill>Travis CI</Skill>
                <Skill>Jest</Skill>
                <Skill>Jasmine</Skill>
                <Skill>Nightwatch</Skill>
                <Skill>Eslint</Skill>
                <Skill>Sasslint</Skill>
                <Skill>500+ Code Reviews</Skill>
              </SkillSet>
              <SkillSet title="Deprecated Skills">
                <Skill>Vagrant</Skill>
                <Skill>PHP</Skill>
                <Skill>Backbone</Skill>
                <Skill>Handlebars</Skill>
                <Skill>Haml</Skill>
                <Skill>CoffeeScript</Skill>
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
                dataUrl="data/month/contributions"
                xLabel="Last 30 days"
                accumulate={false}
                title="Github Contributions"
                info="Does not include over 3000 contribution to private Github Enterprise" />
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
