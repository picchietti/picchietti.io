import React from 'react';
import PropTypes from 'prop-types';

export default class Skill extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <span className="skill">{ this.props.children }</span>
    );
  }
}
