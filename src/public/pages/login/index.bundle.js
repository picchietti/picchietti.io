import React, { useState } from 'react';
import axios from 'axios';

import PasswordStrength from '../../components/password_strength';
import './index.scss';
import { httpError } from '../../scripts/errors';

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
    axios.post('/login', {
      username,
      password
    }).then((response) => {
      setFeedback('');
      setPassword('');

      // returns page that referred to login page
      location.href = response.data;
    }).catch(httpError((error) => {
      if(error.response.status === 401) {
        setFeedback('Incorrect username or password.');
        setPassword('');
      }
    }));
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
