import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../index.scss';

export default class SkillSet extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    featured: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <div>
        <div className="subtitle">
          { this.props.featured && <span><FontAwesomeIcon icon="star" className="featured" />&nbsp;</span> }
          { this.props.title }
        </div>
        { this.props.children }
      </div>
    );
  }
}
