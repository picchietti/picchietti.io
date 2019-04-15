import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export default function NotFound(props) {
  return (
    <main>
      <div styleName="notfound">
        <div styleName="centered">
          <div styleName="message">
            <div styleName="large">Something&apos;s missing!</div>
            <div styleName="small">This page may have been moved or removed.</div>
            <div styleName="small">Please check your spelling.</div>
            <Link to="/">
              <button>Take me to the homepage</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
