import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

export default class PasswordStrength extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  calculate() {
		var password = document.getElementById("pass1").value;
		var has_symbols = /[^a-zA-Z]+/;
		const symbols_points = 2;
		const recommended_length = 16;
		const max_points = recommended_length + symbols_points;
		var points = 0;

		points += Math.min(password.length, recommended_length);

		if(has_symbols.test(password))
			points += symbols_points;

		var indicator = document.getElementById("strength");
		var points_percentage = points / max_points * 100;
		indicator.style.width = points_percentage + '%';

		if(points_percentage < 40) // bad
			indicator.style.backgroundColor = "#f00";
		else if(points_percentage < 70) // good
			indicator.style.backgroundColor = "rgb(255, 207, 12)";
		else // awesome
			indicator.style.backgroundColor = "#6f0";
  }

  render() {
    return (
      <div className="wrap-password">
        <input type="password" className="password-input" placeholder="Password" {...this.props} />
        <div className="strength"></div>
      </div>
    );
  }
}
