import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NotFound from './pages/404';
import Resume from './pages/resume';
import Login from './pages/login';

import 'font-awesome/css/font-awesome.css';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Resume} />
      <Route path="/pages/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </HashRouter>,
  document.getElementById('main')
);
