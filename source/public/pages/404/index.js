import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

export default class NotFound extends React.Component {
  render() {
    return (
      <div id="main">
    		<div id="content">
    			<div className="centered">
    				<div id="message404">
    					<div className="large">Something's missing!</div>
    					<div className="small">This page may have been moved or removed.</div>
    					<div className="small">Please check your spelling.</div>
    					<Link to="/">
    						<button>Take me to the homepage</button>
    					</Link>
    				</div>
    			</div>
    		</div>
      </div>
    );
  }
}
