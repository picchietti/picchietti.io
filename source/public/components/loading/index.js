import React from 'react';

import './index.scss';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
    );
  }
}
