import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NotFound from '../../pages/404';
import Resume from '../../pages/resume';
import Login from '../../pages/login';
import Uploader from '../../pages/uploader';
import Resource from '../../pages/resource';

import './index.scss';

export default class Pages extends React.Component {
  render() {
    return (
      <div id="main">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Resume} />
            <Route exact path="/pages/login" component={Login} />
            <Route exact path="/pages/uploader" component={Uploader} />
            <Route path="/pages/resource" component={Resource} />
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
