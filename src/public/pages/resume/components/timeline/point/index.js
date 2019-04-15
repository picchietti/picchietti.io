import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../index.scss';

function Point(props) {
  const getShortDateRange = () => {
    if(props.to === Point.defaultProps.to)
      return `${props.from}+`;

    return `${props.from.slice(-2)}-${props.to.slice(-2)}`;
  };

  const shortDateRange = getShortDateRange();
  const longDateRange = `${props.from} - ${props.to}`;
  const icon = (props.isFeatured) ? 'star' : 'circle';
  const iconClass = (props.isFeatured) ? 'featured' : '';

  const bullets = props.bullets.map((bullet, i) => (
    <li key={i}>{bullet}</li>
  ));

  return (
    <div styleName="point">
      <div styleName="when" className="fa-layers fa-2x" title={longDateRange}>
        <FontAwesomeIcon icon="circle" styleName="background" />
        <FontAwesomeIcon icon={ icon } styleName="foreground" className={iconClass} />
        <span styleName="year">{shortDateRange}</span>
      </div>
      <div styleName="what">
        <FontAwesomeIcon icon="caret-left" />
        {props.description}
        <ul>
          {bullets}
        </ul>
      </div>
    </div>
  );
}

Point.propTypes = {
  from: PropTypes.string.isRequired, // string with YYYY at end
  to: PropTypes.string, // string with YYYY at end
  description: PropTypes.any.isRequired, // string or jsx
  bullets: PropTypes.array.isRequired, // array of (strings or jsx)
  isFeatured: PropTypes.bool
};

Point.defaultProps = {
  to: 'Current'
};

export default Point;
