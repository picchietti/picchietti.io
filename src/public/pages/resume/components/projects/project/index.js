import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../index.scss';

export default class Project extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    link: PropTypes.string,
    description: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <a href={ this.props.link }>
        <div styleName="project">
          <div styleName="project-contents">
            <FontAwesomeIcon icon={ this.props.icon } size="2x" fixedWidth />
            <div>
              <div className="bold">{ this.props.title }</div>
              <div>{ this.props.description }</div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
