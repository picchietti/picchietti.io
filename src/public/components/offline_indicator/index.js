import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

export default class OfflineIndicator extends React.Component {
  constructor(props) {
    super(props);

    const initiallyHidden = (typeof navigator !== 'undefined') ? navigator.onLine : true;

    this.state = {
      hidden: initiallyHidden
    }

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const handleConnectionChange = () => {
      this.setState({
        hidden: navigator.onLine
      });

      const addOrRemove = (navigator.onLine) ? 'remove' : 'add';
      document.body.classList[addOrRemove]('offline');
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
  }

  handleClose() {
    this.setState({
      hidden: true
    });
  }

  render() {
    return (
      !this.state.hidden &&
        <div className="offline-indicator">
          <div className="wrap-text">
            No internet connection.
          </div>
          <div className="wrap-close">
            <FontAwesomeIcon
              className="close"
              icon="times"
              onClick={ this.handleClose } />
          </div>
        </div>
    );
  }
}
