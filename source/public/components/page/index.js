import React from 'react';
import { omit } from 'lodash';

import Loading from '../loading';

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.filtered_props = _.omit(props, ['load'])
    
    this.state = {
      component: null
    }
  }

  componentWillMount() {
    this.props.load((component) => {
      this.setState({
        component: component.default
      });
    });
  }

  render() {
    return (
      (this.state.component) ? <this.state.component {...this.filtered_props} /> : <Loading />
    );
  }
}
