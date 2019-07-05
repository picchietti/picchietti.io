import React from 'react';

export const yearsOfExperience = parseInt((new Date()).getFullYear()) - 2007;

export const employmentHistory = [
  {
    from: '2018',
    description: <span><span className="bold">Software Engineer</span>, <a href="https://www.express-scripts.com/" target="_blank" rel="noopener noreferrer">Express Scripts</a></span>,
    bullets: [
      <span>Meaningfully contributed to 22 Express Scripts projects.</span>,
      <span>A top contributor in regards to story (issue/ticket) count.</span>
    ],
    isFeatured: true
  },
  {
    from: '2015',
    to: '2018',
    description: <span><span className="bold">Software Engineer</span>, <a href="http://www.greplytix.com/" target="_blank" rel="noopener noreferrer">Greplytix</a></span>,
    bullets: [
      <span><a href="/other/greplytix-recommendation-online.pdf">Letter of recommendation</a>.<span className="on-print-inline"> (online)</span></span>,
      <span>Component-based, MVC web application development.</span>,
      <span>Promoted to lead client-side developer.</span>
    ]
  },
  {
    from: '2013',
    to: '2015',
    description: <span><span className="bold">Webmaster</span>, <a href="http://www.siualumni.com/" target="_blank" rel="noopener noreferrer">Southern Illinois University Alumni Association</a></span>,
    bullets: [
      <span>Handled all website tasks.</span>,
      <span>Assisted clients with technical problems.</span>,
      <span>Utilized analytical data for informed, money-saving decisions.</span>
    ]
  },
  {
    from: '2011',
    to: '2012',
    description: <span><span className="bold">Information Technology</span>, <a href="http://infotech.siu.edu/" target="_blank" rel="noopener noreferrer">Southern Illinois University IT</a></span>,
    bullets: [
      <span>Inspected thousands of code files for malicious code.</span>,
      <span>Trained new employees.</span>
    ]
  },
  {
    from: '2010',
    to: '2011',
    description: <span><span className="bold">Computer Lab Manager</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank" rel="noopener noreferrer">Champaign Central High School</a></span>,
    bullets: [
      <span>Administered and networked 25 Apple iMacs.</span>,
      <span>Taught students web development.</span>
    ]
  },
  {
    from: '2009',
    to: '2011',
    description: <span><span className="bold">Lead Web Developer</span>, <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank" rel="noopener noreferrer">Champaign Central High School</a></span>,
    bullets: [
      <span>Only student with expertise and trust to work on <a href="http://www2.champaignschools.org/schools/home/?id=32" target="_blank" rel="noopener noreferrer">school website</a>.</span>,
      <span>Edited several hundred webpages.</span>
    ]
  }
];
