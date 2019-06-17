import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.css';

export default function Loading(props) {
  return (
    <div styleName="loading">
      <FontAwesomeIcon icon="spinner" size="3x" pulse fixedWidth />
    </div>
  );
}
