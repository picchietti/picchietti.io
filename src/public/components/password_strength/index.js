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
      indicator_style: {}
    }

    bindAll(this, ['passwordChanged']);
  }

  passwordChanged(event) {
    // parent needs a chance to update the value
    this.props.onChange(event);

    this.calculate(event);
  }

  calculate(event) {
    var password = event.target.value;
		var has_symbols = /[^a-zA-Z]+/;
		const symbols_points = 2;
		const recommended_length = 16;
		const max_points = recommended_length + symbols_points;
		var points = 0;

		points += Math.min(password.length, recommended_length);

		if(has_symbols.test(password))
			points += symbols_points;

		var points_percentage = points / max_points * 100;

    var backgroundColor;
		if(points_percentage < 40) // bad
			backgroundColor = '#f00';
		else if(points_percentage < 70) // good
			backgroundColor = 'rgb(255, 207, 12)';
		else // awesome
			backgroundColor = '#6f0';

    this.setState({
      indicator_style: {
        width: points_percentage + '%',
        backgroundColor: backgroundColor
      }
    });
  }

  render() {
    return (
      <div styleName="wrap-password">
        <input {...this.props} type="password" placeholder="Password" onChange={this.passwordChanged} />
        <div styleName="strength" style={this.state.indicator_style}></div>
      </div>
    );
  }
}
