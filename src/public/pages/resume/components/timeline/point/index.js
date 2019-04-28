import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../index.scss';

function Point(props) {
  const getShortDateRange = () => {
    if(!props.to)
      return `${props.from}+`;

    return `${props.from.slice(-2)}-${props.to.slice(-2)}`;
  };

  const getLongDateRange = () => {
    const to = props.to || 'Current';
    return `${props.from} - ${to}`;
  };

  const shortDateRange = getShortDateRange();
  const longDateRange = getLongDateRange();
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

const validStringWithYear = (isRequired) => (props, propName, componentName) => {
  const prop = props[propName];

  if (isRequired && prop === undefined || prop === null) {
    return new Error(
      `Prop "${propName}" required for <${componentName}>.`
    );
  }
  else if (!isRequired && prop === undefined || prop === null) {
    return null;
  }

  if (typeof prop !== 'string') {
    return new Error(
      `Invalid prop "${propName}" for <${componentName}>. Must be a string.`
    );
  }
  if (!/\d{4}/.test(prop)) {
    console.log('prop', prop);
    return new Error(
      `Invalid prop "${propName}" for <${componentName}>. String must contain four digits.`
    );
  }

  return null;
};

const stringOrJsx = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]);

Point.propTypes = {
  from: validStringWithYear(true),
  to: validStringWithYear(false),
  description: stringOrJsx.isRequired,
  bullets: PropTypes.arrayOf(stringOrJsx).isRequired,
  isFeatured: PropTypes.bool
};

export default Point;
