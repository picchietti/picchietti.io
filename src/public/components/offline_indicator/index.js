import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

export default function OfflineIndicator(props) {
  const initiallyHidden = (typeof navigator === 'undefined') ? true : navigator.onLine;
  const [hidden, setHidden] = useState(initiallyHidden);
  const handleClose = () => {
    setHidden(true);
  };

  useEffect(() => {
    const handleConnectionChange = () => {
      setHidden(navigator.onLine);
      const addOrRemove = (navigator.onLine) ? 'remove' : 'add';
      document.body.classList[addOrRemove]('offline');
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return function cleanup() {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  });

  return (
    !hidden &&
      <div styleName="offline-indicator">
        <div styleName="wrap-text">
          No internet connection.
        </div>
        <div styleName="wrap-close">
          <FontAwesomeIcon
            styleName="close"
            icon="times"
            onClick={ handleClose } />
        </div>
      </div>
  );
}
