import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Resume from './pages/resume';

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={Resume} />
  </HashRouter>,
  document.getElementById('main')
);
