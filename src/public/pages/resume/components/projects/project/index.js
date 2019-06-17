import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../index.css';

function Project(props) {
  return (
    <a href={ props.link }>
      <div styleName="project">
        <div styleName="project-contents">
          <FontAwesomeIcon icon={ props.icon } size="2x" fixedWidth />
          <div>
            <div className="bold">{ props.title }</div>
            <div>{ props.description }</div>
          </div>
        </div>
      </div>
    </a>
  );
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string,
  description: PropTypes.string
};

export default Project;
