import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';
import profile from './images/profile2.png';
import Triangles from './components/triangles/';

export default function Header(props) {
  return (
    <header className="no-print">
      <Triangles />
      <div styleName="profile">
        <img src={profile} alt="Me" styleName="picture" />
      </div>
      <div className="wrap-centered">
        <div styleName="menu" className="alignl">
          <div styleName="links">
            <div styleName="links-centered">
              <div><a href="https://github.com/picchietti" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={ ['fab', 'github'] } fixedWidth /><span styleName="text"> Github</span></a></div>
              <div><a href="https://www.linkedin.com/in/picchietti/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={ ['fab', 'linkedin'] } fixedWidth /><span styleName="text"> LinkedIn</span></a></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
