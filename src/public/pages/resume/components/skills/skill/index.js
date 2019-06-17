import React from 'react';
import PropTypes from 'prop-types';

import '../index.css';

function Skill(props) {
  return (
    <span styleName="skill">{ props.children }</span>
  );
}

Skill.propTypes = {
  children: PropTypes.any.isRequired
};

export default Skill;
