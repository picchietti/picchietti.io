import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Page from '../page';

import loadNotFound from 'bundle-loader?lazy!../../pages/404';
import loadResume from 'bundle-loader?lazy!../../pages/resume';
import loadLogin from 'bundle-loader?lazy!../../pages/login';
import loadUploader from 'bundle-loader?lazy!../../pages/uploader';
import loadResource from 'bundle-loader?lazy!../../pages/resource';

const NotFoundPage = (props) => ( <Page {...props} load={loadNotFound}></Page> )
const ResumePage = (props) => ( <Page {...props} load={loadResume}></Page> )
const LoginPage = (props) => ( <Page {...props} load={loadLogin}></Page> )
const UploaderPage = (props) => ( <Page {...props} load={loadUploader}></Page> )
const ResourcePage = (props) => ( <Page {...props} load={loadResource}></Page> )

import './index.scss';

export default class Pages extends React.Component {
  render() {
    return (
      <div className="page">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ResumePage} />
            <Route exact path="/pages/login" component={LoginPage} />
            <Route exact path="/pages/uploader" component={UploaderPage} />
            <Route path="/pages/resource" component={ResourcePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
