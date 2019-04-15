import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

function Projects(props) {
  const passedProjects = React.Children.toArray(props.children);
  const maxShown = 2;
  const shownDifference = passedProjects.length - maxShown;
  const initiallyShown = passedProjects.slice(0, maxShown);

  const [showingMore, setShowingMore] = useState(false);
  const [projects, setProjects] = useState(initiallyShown);

  function handleToggle() {
    const projectsShown = passedProjects.slice(0, (showingMore) ? maxShown : undefined);
    setShowingMore(!showingMore);
    setProjects(projectsShown);
  }

  return (
    <span>
      <div className="indent" styleName="projects">
        { projects }
      </div>

      <div className="indent">
        { shownDifference > 0 &&
          <button styleName="show-more" onClick={ handleToggle }>
            ({ shownDifference }) { showingMore ? 'Less' : 'More' }
          </button>
        }
        <a
          href="https://github.com/picchietti"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex="-1"
        >
          <button>
            <FontAwesomeIcon icon={ ['fab', 'github'] } /> More on Github
          </button>
        </a>

        <div>
          Extra websites I&apos;ve worked on but no longer maintain:&nbsp;
          <a href="http://www.stlaurs.org/" target="_blank" rel="noopener noreferrer">Stlaurs</a>,&nbsp;
          <a href="http://www2.cs.siu.edu/~HPCLab/" target="_blank" rel="noopener noreferrer">SIU HPC Lab</a>
        </div>
      </div>
    </span>
  );
}

Projects.propTypes = {
  children: PropTypes.any.isRequired
};

export default Projects;
