import React from 'react';

import './index.css';

export default class Login extends React.Component {
  render() {
    return (
      <div id="main">
        <div id="content">
        	<div id="feedback"></div>
        	<div id="signin" className="wrap-centered">
        		<div className="wrap-centered">
        			Login<br />
        			<input type="email" id="email1" placeholder="Email" /><br />
        			<div className="wrap-password">
        				<input type="password" id="pass1" placeholder="Password" />
        				<div id="strength" className="strength"></div>
        			</div>
        		</div>
        	</div>
        	<div id="access" className="wrap-centered">
        	You've reached a restricted, top secret area of this website that is protected by level 99 shadow warlocks, robots, and an overworked intern named Jeff ... or just a login system. Whatever.
        	</div>
        </div>
      </div>
    );
  }
}
