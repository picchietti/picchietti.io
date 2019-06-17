import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Skills(props) {
  const passedSkillsets = React.Children.toArray(props.children);
  const maxShown = 1;
  const shownDifference = passedSkillsets.length - maxShown;
  const initiallyShown = passedSkillsets.slice(0, maxShown);

  const [showingMore, setShowingMore] = useState(false);
  const [skillsets, setSkillsets] = useState(initiallyShown);

  function handleToggle() {
    const skillsetsShown = passedSkillsets.slice(0, (showingMore) ? maxShown : undefined);
    setSkillsets(skillsetsShown);
    setShowingMore(!showingMore);
  }

  return (
    <span>
      <div styleName="skills">
        { skillsets }
      </div>

      <button onClick={ handleToggle }>
        ({ shownDifference }) { showingMore ? 'Less' : 'More' }
      </button>
    </span>
  );
}

Skills.propTypes = {
  children: PropTypes.any.isRequired
};

export default Skills;
