import React from 'react';
import { omit } from 'lodash';
import PropTypes from 'prop-types';

import Loading from '../loading';

export default class Page extends React.Component {
  static propTypes = {
    load: PropTypes.func.isRequired // used to load bundle
  }

  constructor(props) {
    super(props);

    this.filteredProps = omit(props, ['load']);

    this.state = {
      component: null
    };
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
      (this.state.component) ? <this.state.component {...this.filteredProps} /> : <Loading />
    );
  }
}
