import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

export default class Loading extends React.Component {
  render() {
    return (
      <div styleName="loading">
        <FontAwesomeIcon icon="spinner" size="3x" pulse fixedWidth />
      </div>
    );
  }
}
