import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.css';

import './assets/diploma.png';
import './assets/awards/wyse.jpg';
import './assets/certifications/analytics/ecommerce.png';
import './assets/certifications/analytics/fundamentals.png';
import './assets/certifications/analytics/platform.png';

function Resource(props) {
  const [resource, setResource] = useState('');

  useEffect(() => {
    // resource should be passed in url like: /pages/resource/diploma.png
    const path = props.location.pathname.split('/pages/resource/');

    if(path[1]) {
      setResource(`${location.origin}/pages/resource/assets/${path[1]}`);
    }
  }, [props.location]);

  return (
    <main>
      <div styleName="resource">
        <Link to="/">
          <div styleName="back" className="alignc">
            <FontAwesomeIcon icon="arrow-left" />
            Back
          </div>
        </Link>
        <div styleName="item">
          <img alt="resource" src={resource} />
        </div>
      </div>
    </main>
  );
}

Resource.propTypes = {
  location: PropTypes.object.isRequired
};

export default Resource;
