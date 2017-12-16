import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.scss';

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
      <div className="content">
        <div className="resource">
          <Link to="/">
            <div className="back alignc">
              <i className="fa fa-arrow-left"></i>
              Back
            </div>
          </Link>
          <div className="item">
            <img alt="resource" src={this.state.resource} />
          </div>
        </div>
      </div>
    );
  }
}
