import React from 'react';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';

import './index.scss';

export default class Skills extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);

    this.skillsets = React.Children.toArray(this.props.children);
    this.maxShown = 1;
    this.shownDifference = this.skillsets.length - this.maxShown;

    var initiallyShown = this.skillsets.slice(0, this.maxShown);

    this.state = {
      showingMore: false,
      skillsets: initiallyShown
    }

    bindAll(this, ['handleToggle']);
  }

  handleToggle() {
    this.setState(prevState => {
      var skillsets_shown = this.skillsets.slice(0, (prevState.showingMore) ? this.maxShown : undefined);

      return {
        showingMore: !prevState.showingMore,
        skillsets: skillsets_shown
      };
    });
  }

  render() {
    return (
      <span>
        <div className="skills">
          { this.state.skillsets }
        </div>

        <div className="indent">
          <button onClick={this.handleToggle}>({this.shownDifference}) {this.state.showingMore ? 'Less' : 'More'}</button>
        </div>
      </span>
    );
  }
}
