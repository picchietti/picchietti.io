import React from 'react';
import PropTypes from 'prop-types';

export default class Point extends React.Component {
  static propTypes = {
    from: PropTypes.string.isRequired, // string with YYYY at end
    to: PropTypes.string.isRequired, // string with YYYY at end
    description: PropTypes.any.isRequired, // string or jsx
    bullets: PropTypes.array.isRequired // array of (strings or jsx)
  }

  constructor(props) {
    super(props);

    this.shortDateRange = props.from.slice(-2) + '-' + props.to.slice(-2);
    this.longDateRange = props.from + ' - ' + props.to;
    this.iconClass = 'fa fa-stack-1x foreground ' + ((props.isFeatured) ? 'featured fa-star' : 'fa-circle');

    this.bullets = props.bullets.map((bullet, i) => (
      <li key={i}>{bullet}</li>
    ));
  }

  render() {
    return (
      <div className="point">
        <div className="when fa-stack fa-2x" title={this.longDateRange}>
          <i className="fa fa-stack-1x fa-circle background"></i>
          <i className={this.iconClass}></i>
          <i className="fa year">{this.shortDateRange}</i>
        </div>
        <div className="what">
          <i className="fa fa-caret-left"></i>
          {this.props.description}
          <ul>
            {this.bullets}
          </ul>
        </div>
      </div>
    );
  }
}
