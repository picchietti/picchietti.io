import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

import './assets/diploma.png';
import './assets/awards/wyse.jpg';
import './assets/certifications/analytics/ecommerce.png';
import './assets/certifications/analytics/fundamentals.png';
import './assets/certifications/analytics/platform.png';

export default class Resource extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      resource: ''
    }
  }

  componentDidMount() {
    // resource should be passed in url like: /pages/resource/diploma.png
    var path = this.props.location.pathname.split('/pages/resource/');

    if(path[1]){
      this.setState({
        resource: `${location.origin}/pages/resource/assets/${path[1]}`
      })
    }
  }

  render() {
    return (
      <main>
        <div className="resource">
          <Link to="/">
            <div className="back alignc">
              <FontAwesomeIcon icon="arrow-left" />
              Back
            </div>
          </Link>
          <div className="item">
            <img alt="resource" src={this.state.resource} />
          </div>
        </div>
      </main>
    );
  }
}
