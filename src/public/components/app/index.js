import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../header';
import Page from '../page';
import OfflineIndicator from '../offline_indicator';

import loadNotFound from '../../pages/404/index.bundle.js';
import loadResume from '../../pages/resume/index.bundle.js';
import loadLogin from '../../pages/login/index.bundle.js';
import loadUploader from '../../pages/uploader/index.bundle.js';
import loadResource from '../../pages/resource/index.bundle.js';

const NotFoundPage = (props) => ( <Page {...props} load={loadNotFound} /> )
const ResumePage = (props) => ( <Page {...props} load={loadResume} /> )
const LoginPage = (props) => ( <Page {...props} load={loadLogin} /> )
const UploaderPage = (props) => ( <Page {...props} load={loadUploader} /> )
const ResourcePage = (props) => ( <Page {...props} load={loadResource} /> )

import './index.scss';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <div styleName="page">
            <Switch>
              <Route exact path="/" component={ResumePage} />
              <Route exact path="/pages/login" component={LoginPage} />
              <Route exact path="/pages/uploader" component={UploaderPage} />
              <Route path="/pages/resource" component={ResourcePage} />
              <Route component={NotFoundPage} />
            </Switch>
            <OfflineIndicator />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
