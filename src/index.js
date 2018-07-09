import React from 'react';
import ReactDOM from 'react-dom';

import App from './public/components/app';
import setupFontAwesome from './public/scripts/font-awesome';
import setupAnalytics from './public/scripts/analytics';

import './public/index.scss';

setupFontAwesome();

setTimeout(setupAnalytics, 500);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
