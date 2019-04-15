import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

function PasswordStrength(props) {
  const [indicatorStyle, setIndicatorStyle] = useState({});

  function passwordChanged(event) {
    // parent needs a chance to update the value
    props.onChange(event);

    calculate(event);
  }

  function calculate(event) {
    const password = event.target.value;
    const hasSymbols = /[^a-zA-Z]+/;
    const symbolsPoints = 2;
    const recommendedLength = 16;
    const maxPoints = recommendedLength + symbolsPoints;
    let points = 0;

    points += Math.min(password.length, recommendedLength);

    if(hasSymbols.test(password))
      points += symbolsPoints;

    const pointsPercentage = points / maxPoints * 100;

    let backgroundColor;
    if(pointsPercentage < 40) // bad
      backgroundColor = '#f00';
    else if(pointsPercentage < 70) // good
      backgroundColor = 'rgb(255, 207, 12)';
    else // awesome
      backgroundColor = '#6f0';

    setIndicatorStyle({
      width: `${pointsPercentage}%`,
      backgroundColor
    });
  }

  return (
    <div styleName="wrap-password">
      <input {...props} type="password" placeholder="Password" onChange={passwordChanged} />
      <div styleName="strength" style={indicatorStyle}></div>
    </div>
  );
}

PasswordStrength.propTypes = {
  // used to update the value of the password input
  onChange: PropTypes.func.isRequired
};

export default PasswordStrength;
