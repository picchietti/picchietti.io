import React from 'react';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';

import './index.scss';

export default class PasswordStrength extends React.Component {
  static propTypes = {
    // used to update the value of the password input
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      indicatorStyle: {}
    };

    bindAll(this, ['passwordChanged']);
  }

  passwordChanged(event) {
    // parent needs a chance to update the value
    this.props.onChange(event);

    this.calculate(event);
  }

  calculate(event) {
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

    this.setState({
      indicatorStyle: {
        width: `${pointsPercentage}%`,
        backgroundColor: backgroundColor
      }
    });
  }

  render() {
    return (
      <div styleName="wrap-password">
        <input {...this.props} type="password" placeholder="Password" onChange={this.passwordChanged} />
        <div styleName="strength" style={this.state.indicatorStyle}></div>
      </div>
    );
  }
}
