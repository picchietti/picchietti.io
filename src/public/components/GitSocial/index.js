import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.css';

function GitSocial(props) {
  const [on, setOn] = useState(false);

  const websiteName = (on) ? 'lab' : 'hub';
  const onOffClass = (on) ? 'on' : 'off';

  return (
    <div styleName="git-social">
      <div styleName={ `slider ${onOffClass}` } onClick={ () => setOn(!on) }>
        <FontAwesomeIcon icon={ ['fab', `git${websiteName}`] } />
      </div>
      <a
        href={ `https://git${websiteName}.com/picchietti` }
        target="_blank"
        rel="noopener noreferrer"
      >Git{ websiteName }</a>
    </div>
  );
}

export default GitSocial;
