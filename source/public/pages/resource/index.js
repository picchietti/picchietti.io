import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './index.css';

export default class Resource extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      resource: ''
    }
  }

  componentDidMount() {
    // resource should be passed in url like: /pages/resource/diploma.png
    var path = this.props.location.pathname.split('/pages/resource/')

    if(path[1]){
      this.setState({
        resource: `${location.origin}/pages/resource/assets/${path[1]}`
      })
    }
  }

  render() {
    return (
      <div id="main">
    		<div id="content">
          <div id="stage">
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
      </div>
    );
  }
}
