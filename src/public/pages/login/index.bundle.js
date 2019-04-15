import React, { useState } from 'react';

import PasswordStrength from '../../components/password_strength';

import './index.scss';
import XHR2 from '../../scripts/xhr2.js';

export default function Login(props) {
  const [feedback, setFeedback] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function usernameChanged(event) {
    setUsername(event.target.value);
  }

  function passwordChanged(event) {
    setPassword(event.target.value);
  }

  function checkReady(event) {
    if(event.keyCode === 13) {
      if(username && password)
        login();
    }
  }

  function login() {
    const xhr2 = new XHR2('POST', '/login');
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.onload = () => {
      if(xhr2.status === 401) {
        setFeedback('Incorrect username or password.');
        setPassword('');
      }
      else if(xhr2.status === 200) {
        setFeedback('');
        setPassword('');

        // returns page that referred to login page
        location.href = xhr2.responseText;
      }
    };

    xhr2.send(`username=${username}&password=${password}`);
  }

  return (
    <main>
      <div styleName="login">
        {feedback &&
          <div styleName="feedback">{feedback}</div>
        }
        <div className="wrap-centered" styleName="form">
          <div className="wrap-centered">
            Login<br />
            <input type="email" placeholder="Email" value={username} onChange={usernameChanged} onKeyUp={checkReady} /><br />
            <PasswordStrength value={password} onChange={passwordChanged} onKeyUp={checkReady} />
          </div>
        </div>
        <div className="wrap-centered" styleName="no-access">
        You&apos;ve reached a restricted, top secret area of this website that is protected by level 99 shadow warlocks, robots, and an overworked intern named Jeff ... or just a login system. Whatever.
        </div>
      </div>
    </main>
  );
}
