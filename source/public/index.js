import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Resume from './pages/resume';

import 'font-awesome/css/font-awesome.css';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={Resume} />
  </HashRouter>,
  document.getElementById('main')
);
