import React from 'react';
import ReactDOM from 'react-dom';

import App from './public/components/app';
import setupFontAwesome from './public/scripts/font-awesome';

import './public/index.css';

setupFontAwesome();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
