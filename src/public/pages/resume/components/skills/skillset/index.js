import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../index.css';

function SkillSet(props) {
  return (
    <div>
      <div className="subtitle">
        { props.featured && <span><FontAwesomeIcon icon="star" className="featured" />&nbsp;</span> }
        { props.title }
      </div>
      { props.children }
    </div>
  );
}

SkillSet.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  featured: PropTypes.bool
};

export default SkillSet;
