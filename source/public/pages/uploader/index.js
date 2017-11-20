import React from 'react';

import './index.scss';

export default class Uploader extends React.Component {
  render() {
    return (
      <div className="content">
      	<div className="alignc space">
      		<input type="text" id="url" placeholder="Upload from URL..." onkeypress="checkEnter(event);" />
      	</div>
      	<div id="droparea" className="droparea"></div>
      	<div id="uploads"></div>
      	<div id="previews"></div>
      </div>
    );
  }
}
