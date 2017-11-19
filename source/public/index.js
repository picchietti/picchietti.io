import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import Pages from './components/pages';

import 'font-awesome/css/font-awesome.css';
import './index.scss';

ReactDOM.render(
  <div className="app">
    <Header />
    <Pages />
  </div>,
  document.getElementById('app')
);
