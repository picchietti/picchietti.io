import React from 'react';
import { bindAll } from 'lodash';

import PasswordStrength from '../../components/password_strength';

import './index.scss';
import XHR2 from '../../scripts/xhr2.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: '',
      username: '',
      password: ''
    };

    bindAll(this, ['usernameChanged', 'passwordChanged', 'checkReady']);
  }

  usernameChanged(event) {
    this.setState({
      username: event.target.value
    });
  }

  passwordChanged(event) {
    this.setState({
      password: event.target.value
    });
  }

  componentWillUnmount() {
    // clear username and password
    this.setState({});
  }

  checkReady(event) {
    if(event.keyCode == 13){
      var username = this.state.username;
      var password = this.state.password;

      if(username && password)
        this.login();
    }
  }

  login() {
    var username = this.state.username;
    var password = this.state.password;

    var xhr2 = new XHR2('POST', '/login');
    xhr2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr2.onload = () => {
      if(xhr2.status == 401){
        this.setState({
          feedback: 'Incorrect username or password.',
          password: ''
        });
      }
      else if(xhr2.status == 200){
        this.setState({});

        // returns page that referred to login page
        location.href = xhr2.responseText;
      }
    }
    xhr2.send('username=' + username + '&password=' + password);
  }

  render() {
    return (
      <main>
        <div className="login">
          {this.state.feedback &&
            <div className="feedback">{this.state.feedback}</div>
          }
          <div className="form wrap-centered">
            <div className="wrap-centered">
              Login<br />
              <input type="email" placeholder="Email" value={this.state.username} onChange={this.usernameChanged} onKeyUp={this.checkReady} /><br />
              <PasswordStrength value={this.state.password} onChange={this.passwordChanged} onKeyUp={this.checkReady} />
            </div>
          </div>
          <div className="no-access wrap-centered">
          You&apos;ve reached a restricted, top secret area of this website that is protected by level 99 shadow warlocks, robots, and an overworked intern named Jeff ... or just a login system. Whatever.
          </div>
        </div>
      </main>
    );
  }
}
