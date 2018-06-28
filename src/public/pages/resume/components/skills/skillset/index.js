import React from 'react';
import PropTypes from 'prop-types';

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
          { this.props.featured && <i className="fa fa-star featured">&nbsp;</i> }
          { this.props.title }
        </div>
        { this.props.children }
      </div>
    );
  }
}
