import React from 'react';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

export default class Projects extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);

    this.projects = React.Children.toArray(this.props.children);
    this.maxShown = 2;
    this.shownDifference = this.projects.length - this.maxShown;

    var initiallyShown = this.projects.slice(0, this.maxShown);

    this.state = {
      showingMore: false,
      projects: initiallyShown
    }

    bindAll(this, ['handleToggle']);
  }

  handleToggle() {
    this.setState(prevState => {
      var projects_shown = this.projects.slice(0, (prevState.showingMore) ? this.maxShown : undefined);

      return {
        showingMore: !prevState.showingMore,
        projects: projects_shown
      };
    });
  }

  render() {
    return (
      <span>
        <div className="projects indent">
          { this.state.projects }
        </div>

        <div className="indent">
          {this.shownDifference > 0 &&
            <button className="show-more" onClick={this.handleToggle}>
              ({this.shownDifference}) {this.state.showingMore ? 'Less' : 'More'}
            </button>

          }
          <a href="https://github.com/picchietti" target="_blank" rel="noopener noreferrer">
            <button><FontAwesomeIcon icon={ ['fab', 'github'] } /> More on Github</button>
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
}
