import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Point extends React.Component {
  static propTypes = {
    from: PropTypes.string.isRequired, // string with YYYY at end
    to: PropTypes.string, // string with YYYY at end
    description: PropTypes.any.isRequired, // string or jsx
    bullets: PropTypes.array.isRequired, // array of (strings or jsx)
    isFeatured: PropTypes.bool
  }

  static defaultProps = {
    to: 'Current'
  }

  constructor(props) {
    super(props);

    this.shortDateRange = this.getShortDateRange();
    this.longDateRange = props.from + ' - ' + props.to;
    this.icon = (props.isFeatured) ? 'star' : 'circle';
    this.iconClass = 'foreground' + ((props.isFeatured) ? ' featured' : '');

    this.bullets = props.bullets.map((bullet, i) => (
      <li key={i}>{bullet}</li>
    ));
  }

  getShortDateRange() {
    if(this.props.to === Point.defaultProps.to)
      return this.props.from + '+';
    else
      return this.props.from.slice(-2) + '-' + this.props.to.slice(-2);
  }

  render() {
    return (
      <div className="point">
        <div className="when fa-layers fa-2x" title={this.longDateRange}>
          <FontAwesomeIcon icon="circle" className="background" />
          <FontAwesomeIcon icon={ this.icon } className={ this.iconClass } />
          <span className="year">{this.shortDateRange}</span>
        </div>
        <div className="what">
          <FontAwesomeIcon icon="caret-left" />
          {this.props.description}
          <ul>
            {this.bullets}
          </ul>
        </div>
      </div>
    );
  }
}
